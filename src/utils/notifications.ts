import { toast } from 'react-toastify'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationOptions {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  autoClose?: number
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
}

const defaultOptions: NotificationOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export const showNotification = (
  message: string,
  type: NotificationType = 'info',
  options: NotificationOptions = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options }

  switch (type) {
    case 'success':
      toast.success(message, mergedOptions)
      break
    case 'error':
      toast.error(message, mergedOptions)
      break
    case 'warning':
      toast.warning(message, mergedOptions)
      break
    default:
      toast.info(message, mergedOptions)
  }
}

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showInfo = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showWarning = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}; 