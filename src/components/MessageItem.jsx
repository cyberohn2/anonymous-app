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
    <div className="flex flex-col items-center pb-4 border-b border-gray-500">
      {/* Message container with gradient background */}
      <div
        ref={messageRef}
        className="w-full md:w-2/3 lg:w-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-md mb-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Logo */}
        <div className="absolute top-4 left-4 opacity-20">
          <img src={logo} alt="Hi-me logo" className="w-10 h-10"/>
        </div>

        {/* Message content */}
        <div className="relative z-10">
          <p className="text-xl font-semibold leading-snug text-center mb-2">
            {message}
          </p>
        </div>
      </div>

      {/* Actions: Copy and Download */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-110"
        >
          <img src={clipboardIcon} alt="Copy to clipboard" className="w-5 h-5" />
          Copy
        </button>
        <button
          onClick={handleDownloadAsImage}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-110"
        >
          <img src={downloadIcon} alt="Download as image" className="w-5 h-5" />
          Download
        </button>
      </div>
    </div>
  );
};

export default MessageItem;