import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';

const AppUrlListener = () => {
  let navigate = useNavigate();

  useEffect(() => {
    App.addListener('appUrlOpen', (event) => {
      const slug = event.url.split("thecapitalhub.in").pop();
        if (slug) {
          navigate(slug);
        } else {
          navigate("/home");
        }
    });
  }, []);

  return null;
};

export default AppUrlListener;
