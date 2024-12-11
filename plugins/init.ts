import axios from 'axios';
import { initConfigStoreBasicConfig } from '~/common/store/config';
import { initLoginStoreUserInfo } from '~/common/store/login';

export default defineNuxtPlugin((nuxtApp) => {
    try {
        initLoginStoreUserInfo();
        initConfigStoreBasicConfig();
        console.log('Successed to fetch config:');
    } catch (error) {
        console.error('Failed to fetch config:', error);
        throw error;
    }
})

