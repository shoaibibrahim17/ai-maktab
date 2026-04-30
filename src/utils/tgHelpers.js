export const getTelegram = () => window.Telegram?.WebApp;

export const safeNotify = (message) => {
  const tg = getTelegram();
  if (tg?.isVersionAtLeast('6.2')) {
    tg.showAlert(message);
  } else {
    alert(message);
  }
};

export const safeConfirm = (message) => {
  const tg = getTelegram();
  if (tg?.isVersionAtLeast('6.2')) {
    tg.showConfirm(message);
  } else {
    return confirm(message);
  }
};

export const safeHaptic = (type = 'medium') => {
  const tg = getTelegram();
  if (tg?.isVersionAtLeast('6.1')) {
    tg.HapticFeedback.impactOccurred(type);
  }
};

export const safeSuccessHaptic = () => {
  const tg = getTelegram();
  if (tg?.isVersionAtLeast('6.1')) {
    tg.HapticFeedback.notificationOccurred('success');
  }
};
