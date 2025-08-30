import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

export default {
  // Configuration de Rollup
  input: "src/ts/index.ts",
  output: [
    {
      dir: "public/js",
      format: "umd",
      sourcemap: !isProduction,
    },
  ],
  plugins: [
    typescript({
      compilerOptions: { module: "esnext" },
      outDir: "public/js",
    }),
    isProduction &&
      terser({
        // À vous de le configurer pour supprimer les console
        // (console.log)
        compress: { drop_console: true },
      }),
  ],
};
