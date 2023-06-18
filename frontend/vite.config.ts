import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            'components': path.resolve(__dirname, './src/app/components'),
            'features': path.resolve(__dirname, './src/features'),
            'layouts': path.resolve(__dirname, './src/layouts'),
            'assets': path.resolve(__dirname, './src/assets'),
            'hooks': path.resolve(__dirname, './src/hooks'),
            'utils': path.resolve(__dirname, './src/utils'),
            'libs': path.resolve(__dirname, './src/libs'),
            'app': path.resolve(__dirname, './src/app'),
        }
    },
    server: {
        port: 3000
    }
})
