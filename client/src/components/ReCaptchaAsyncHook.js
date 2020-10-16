import { useState, useEffect } from 'react';
import api from '../api/api';

function ReCaptchaAsyncHook(ReCaptachaValue) {
  const [validRC, setValidRC] = useState(false);
  const [errorRC, setErrorRC] = useState(null);

  useEffect(() => {
    async function validateReCaptcha() {
      try {
        var request = `{"value": "${ReCaptachaValue}"}`;
        request = JSON.parse(request)
        const response = await api.post('/recaptcha', request);
        const success = await response.data.success;
        setValidRC(success);
      } catch (error) {
        setErrorRC("Algo salio mal!");
      }
    }
    if (ReCaptachaValue) {
      validateReCaptcha();
    }
  }, [ReCaptachaValue]);

  return [validRC, errorRC];
}

export default ReCaptchaAsyncHook;