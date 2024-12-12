import type { Config } from 'tailwindcss'
import config from './config'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                ...config.tailwindColors,
                green: {
                    '50': '#e8ffe4',
                    '100': '#cbffc5',
                    '200': '#9aff92',
                    '300': '#5bff53',
                    '400': '#24fb20',
                    '500': '#00fa00',
                    '600': '#00b505',
                    '700': '#028907',
                    '800': '#086c0c',
                    '900': '#0c5b11',
                    '950': '#003305',
                }
            }
        }
    }
}