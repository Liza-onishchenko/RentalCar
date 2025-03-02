const Notification = ({ message, type = 'success' }) => {
  const showNotification = () => {
    toast[type](message, {
      duration: 3000,
      position: 'top-center',
    });
  };

  return null; // Компонент не рендериться напряму, лише викликає toast
};

export default Notification;
