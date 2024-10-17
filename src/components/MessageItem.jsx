import { useRef } from 'react';
import downloadIcon from '/download.svg';
import clipboardIcon from '/clipboard-icon.svg';
import logo from '/logo.png';
import { toPng } from 'html-to-image';

const MessageItem = ({ message }) => {
  const messageRef = useRef(null);

  // Function to copy the message to the clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      alert('Message copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Function to download the message component as an image
  const handleDownloadAsImage = () => {
    if (messageRef.current === null) {
      return;
    }

    toPng(messageRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'message.png';
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download image: ', err);
      });
  };

  return (
    <div className='mb-6' ref={messageRef}>
      <div className='rounded-lg p-3 bg-[#4c4b4b] border border-gray-500 mb-2'>
        <img className='mr-auto' width={50} src={logo} alt="Hi-me logo" />
        <p>{message}</p>
      </div>
      <div className='flex gap-2 items-center'>
        {/* Clipboard Button */}
        <button onClick={handleCopyToClipboard}>
          <img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px]' src={clipboardIcon} alt="clipboard icon copy icon" />
        </button>

        {/* Download Button */}
        <button onClick={handleDownloadAsImage}>
          <img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px]' src={downloadIcon} alt="download icon" />
        </button>
      </div>
    </div>
  );
};

export default MessageItem;
