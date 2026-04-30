export const getTelegram = () => window.Telegram?.WebApp;

/**
 * Safely notifies the user using Telegram's native UI if available, 
 * falling back to a standard browser alert otherwise.
 */
export const safeNotify = (message) => {
  const tg = getTelegram();
  try {
    if (tg && typeof tg.showAlert === 'function' && tg.isVersionAtLeast('6.2')) {
      tg.showAlert(message);
    } else {
      alert(message);
    }
  } catch (e) {
    alert(message);
  }
};

/**
 * Safely requests confirmation from the user.
 */
export const safeConfirm = (message) => {
  const tg = getTelegram();
  try {
    if (tg && typeof tg.showConfirm === 'function' && tg.isVersionAtLeast('6.2')) {
      return tg.showConfirm(message);
    } else {
      return window.confirm(message);
    }
  } catch (e) {
    return window.confirm(message);
  }
};

/**
 * Safely triggers impact haptic feedback.
 */
export const safeHaptic = (type = 'medium') => {
  const tg = getTelegram();
  try {
    if (tg && tg.HapticFeedback && tg.isVersionAtLeast('6.1')) {
      tg.HapticFeedback.impactOccurred(type);
    }
  } catch (e) {
    console.warn("Haptics not supported");
  }
};

/**
 * Safely triggers notification haptic feedback.
 */
export const safeSuccessHaptic = () => {
  const tg = getTelegram();
  try {
    if (tg && tg.HapticFeedback && tg.isVersionAtLeast('6.1')) {
      tg.HapticFeedback.notificationOccurred('success');
    }
  } catch (e) {
    console.warn("Haptics not supported");
  }
};

/**
 * Safely sets the header color (API 6.1+).
 */
export const safeSetHeaderColor = (color) => {
  const tg = getTelegram();
  try {
    if (tg && typeof tg.setHeaderColor === 'function' && tg.isVersionAtLeast('6.1')) {
      tg.setHeaderColor(color);
    }
  } catch (e) {
    console.warn("SetHeaderColor not supported");
  }
};
