import React, { useEffect, useRef } from 'react';
import 'emoji-picker-element'; // Ensure this import for the custom element

const EmojiPickerComponent = React.memo(({ setText, showEmoji, setShowEmoji }) => {
  const emojiPickerComponentRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = e => {
      if (emojiPickerComponentRef.current && !emojiPickerComponentRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setShowEmoji]);

  useEffect(() => {
    const handleEmojiClick = event => {
      setText(prevText => prevText + event.detail.unicode);
      setShowEmoji(false);
    };

    const picker = pickerRef.current;
    if (picker) {
      picker.addEventListener('emoji-click', handleEmojiClick);
    }

    return () => {
      if (picker) {
        picker.removeEventListener('emoji-click', handleEmojiClick);
      }
    };
  }, [setText, setShowEmoji]);

  return (
    <div ref={emojiPickerComponentRef} className="absolute border bottom-24">
      {showEmoji && <emoji-picker ref={pickerRef} emoji-style="apple"></emoji-picker>}
    </div>
  );
});

EmojiPickerComponent.displayName = 'EmojiPickerComponent';

export default EmojiPickerComponent;
