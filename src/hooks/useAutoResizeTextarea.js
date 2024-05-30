import { useEffect, useRef } from 'react';

const useAutoResizeTextarea = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const handleResize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    if (textarea) {
      textarea.addEventListener('input', handleResize);
      return () => textarea.removeEventListener('input', handleResize);
    }
  }, []);

  return textareaRef;
};

export default useAutoResizeTextarea;
