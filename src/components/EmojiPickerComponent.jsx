import React, { useEffect, useRef, useState, memo } from 'react';
import Picker from 'emoji-picker-react';
import { useSelector } from 'react-redux';

const EmojiPicker = memo(({ onEmojiClick, theme }) => (
  <Picker onEmojiClick={onEmojiClick} emojiStyle='native' className='bg-backgroundColor' theme={theme} lazyLoadEmojis={true} skinTonesDisabled={false} />
));

EmojiPicker.displayName = 'EmojiPicker';

const EmojiPickerComponent = ({ setText, showEmoji, setShowEmoji }) => {
  const emojiPickerComponentRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const theme = useSelector(state => state.theme.theme);

  const onEmojiClick = (event) => {
    setText(prevText => prevText + event.emoji);
    // setShowEmoji(false);

  };

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
    // Preload the picker by rendering it once off-screen
    setLoaded(true);
  }, []);

  return (
    <div ref={emojiPickerComponentRef} className="relative">
      {loaded && (
        <div className={`absolute  bottom-10 z-[999] hidden bg-backgroundColor lg:block ${showEmoji ? 'block' : 'hidden'}`}>
          <EmojiPicker onEmojiClick={onEmojiClick} theme={theme === 'light' ? 'light' : 'dark'} />
        </div>
      )}
      {!loaded && <div style={{ display: 'none' }}><EmojiPicker onEmojiClick={onEmojiClick} /></div>}
    </div>
  );
};

export default EmojiPickerComponent;
