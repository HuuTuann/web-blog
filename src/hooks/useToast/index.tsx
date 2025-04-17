import { addToast } from '@heroui/react';
import { X } from 'lucide-react';

const toastConfig = {
  timeout: 3000,
  shouldShowTimeoutProgress: true,
  classNames: {
    closeButton: 'opacity-100 absolute right-4 top-1/2 -translate-y-1/2',
  },
  closeIcon: <X />,
};

const createToast = (
  title: string,
  color: 'success' | 'danger' | 'warning' | 'primary',
) => {
  addToast({ title, color, ...toastConfig });
};

export const Toast = {
  Info: (title: string) => createToast(title, 'primary'),
  Success: (title: string) => createToast(title, 'success'),
  Warning: (title: string) => createToast(title, 'warning'),
  Error: (title: string) => createToast(title, 'danger'),
};
