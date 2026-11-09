"use client";

import { useEffect, useRef } from "react";

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Mobile optimization: On mobile screens (< 768px), disable heavy continuous WebGL shader
    // to preserve 120 FPS buttery smooth touch scrolling and avoid GPU throttling.
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let gl: WebGL2RenderingContext | null = null;

    try {
      gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    } catch {
      gl = null;
    }

    // =========================================================================
    // WEBGL 2.0 FLUID MESH GRADIENT (Extracted 1:1 from D:\projects\razebot_copy)
    // =========================================================================
    if (gl) {
      const vsSource = `#version 300 es
      in vec2 position;
      out vec2 v_objectUV;
      void main() {
        v_objectUV = position;
        gl_Position = vec4(position * 2.0, 0.0, 1.0);
      }`;

      const fsSource = `#version 300 es
      precision mediump float;

      uniform float u_time;
      uniform vec4 u_colors[4];
      uniform float u_colorsCount;
      uniform float u_distortion;
      uniform float u_swirl;

      in vec2 v_objectUV;
      out vec4 fragColor;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float hash21(vec2 p) {
        p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
        p += dot(p, p + 19.19);
        return fract(p.x * p.y);
      }

      float valueNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = hash21(i);
        float b = hash21(i + vec2(1.0, 0.0));
        float c = hash21(i + vec2(0.0, 1.0));
        float d = hash21(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      vec2 getPosition(int i, float t) {
        float a = float(i) * 0.37;
        float b = 0.6 + fract(float(i) / 3.0) * 0.9;
        float c = 0.8 + fract(float(i + 1) / 4.0);
        float x = sin(t * b + a);
        float y = cos(t * c + a * 1.5);
        return 0.5 + 0.5 * vec2(x, y);
      }

      void main() {
        vec2 uv = v_objectUV + 0.5;
        const float firstFrameOffset = 41.5;
        float t = 0.5 * (u_time + firstFrameOffset);

        float radius = smoothstep(0.0, 1.0, length(uv - 0.5));
        float center = 1.0 - radius;
        for (float i = 1.0; i <= 2.0; i++) {
          uv.x += u_distortion * center / i * sin(t + i * 0.4 * smoothstep(0.0, 1.0, uv.y)) * cos(0.2 * t + i * 2.4 * smoothstep(0.0, 1.0, uv.y));
          uv.y += u_distortion * center / i * cos(t + i * 2.0 * smoothstep(0.0, 1.0, uv.x));
        }

        vec2 uvRotated = uv - vec2(0.5);
        float angle = 3.0 * u_swirl * radius;
        uvRotated = rotate(uvRotated, -angle) + vec2(0.5);

        vec3 color = vec3(0.0);
        float opacity = 0.0;
        float totalWeight = 0.0;

        for (int i = 0; i < 4; i++) {
          vec2 pos = getPosition(i, t);
          vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
          float opacityFraction = u_colors[i].a;
          float dist = pow(length(uvRotated - pos), 3.5);
          float weight = 1.0 / (dist + 0.001);

          color += colorFraction * weight;
          opacity += opacityFraction * weight;
          totalWeight += weight;
        }

        color /= max(0.0001, totalWeight);
        opacity /= max(0.0001, totalWeight);
        fragColor = vec4(color, clamp(opacity * 0.85, 0.0, 0.75));
      }`;

      const compileShader = (src: string, type: number) => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, src);
        gl!.compileShader(shader);
        return shader;
      };

      const vs = compileShader(vsSource, gl.VERTEX_SHADER);
      const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Quad Buffer
      const quad = new Float32Array([
        -0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
      ]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

      const posAttr = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      // Uniforms
      const uTime = gl.getUniformLocation(program, "u_time");
      const uColors = gl.getUniformLocation(program, "u_colors");
      const uColorsCount = gl.getUniformLocation(program, "u_colorsCount");
      const uDistortion = gl.getUniformLocation(program, "u_distortion");
      const uSwirl = gl.getUniformLocation(program, "u_swirl");

      // RazeBot Fluid Palette: [#1a2233, #253047, #0d111c, #141a29]
      const colors = new Float32Array([
        26 / 255, 34 / 255, 51 / 255, 1.0,  // #1a2233
        37 / 255, 48 / 255, 71 / 255, 1.0,  // #253047
        13 / 255, 17 / 255, 28 / 255, 1.0,  // #0d111c
        20 / 255, 26 / 255, 41 / 255, 1.0,  // #141a29
      ]);

      gl.uniform4fv(uColors, colors);
      gl.uniform1f(uColorsCount, 4.0);
      gl.uniform1f(uDistortion, 0.8);
      gl.uniform1f(uSwirl, 0.12);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        gl!.viewport(0, 0, canvas.width, canvas.height);
      };

      window.addEventListener("resize", resize, { passive: true });
      resize();

      const startTime = performance.now();
      const render = (now: number) => {
        const t = (now - startTime) * 0.0007; // Smooth natural fluid drift
        gl!.uniform1f(uTime, t);
        gl!.drawArrays(gl!.TRIANGLES, 0, 6);
        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animId);
      };
    } else {
      // 2D Fallback Gradient Pulse
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);

      const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);

      let t = 0;
      const render2d = () => {
        t += 0.01;
        ctx.clearRect(0, 0, w, h);
        const grad = ctx.createRadialGradient(
          w * 0.6 + Math.sin(t) * 80,
          h * 0.4 + Math.cos(t) * 60,
          20,
          w * 0.5,
          h * 0.5,
          w * 0.7
        );
        grad.addColorStop(0, "rgba(26, 34, 51, 0.6)");
        grad.addColorStop(0.5, "rgba(13, 17, 28, 0.8)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        animId = requestAnimationFrame(render2d);
      };
      animId = requestAnimationFrame(render2d);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07090e]">
      {/* 1. Underlying Radial Vignette (RazeBot deep color grading: #181e2e -> #0f1420 -> #07090e) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_15%,#181e2e_0%,#0f1420_45%,#07090e_85%)] opacity-90" />

      {/* 2. WebGL 2.0 Fluid Mesh Canvas (Active on Desktop for silky 120fps performance) */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 w-full h-full opacity-80 transition-opacity duration-1000"
      />

      {/* 3. Subtle Raze Architectural Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 4. Deep Top and Bottom Ambient Fades */}
      <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-b from-transparent via-[#07090e]/70 to-[#07090e]" />
      <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-t from-transparent to-[#07090e]/60" />
    </div>
  );
}

