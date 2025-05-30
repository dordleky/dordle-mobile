

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'ky.dordle.mobile.dev';
  }

  if (IS_PREVIEW) {
    return 'com.dorlde.mobile.preview';
  }

  return 'ky.dordle.mobile';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'Dordle (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Dordle (Preview)';
  }

  return 'Dordle';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
