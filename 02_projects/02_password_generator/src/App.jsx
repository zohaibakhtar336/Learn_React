import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // States for password options
  const [length, setLength] = useState(7);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [password, setPassword] = useState("");

  // useRef for password input (to copy easily)
  const passwordRef = useRef(null);

  // Function to generate password
  const generatePassword = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) characters += "0123456789";
    if (includeSpecialChars) characters += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters[randomIndex];
    }

    setPassword(pass);
  }, [length, includeNumbers, includeSpecialChars]);

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 100);
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  // Reset function to reset all settings & generate a new default password
  const resetSettings = () => {
    setLength(7);
    setIncludeNumbers(false);
    setIncludeSpecialChars(false);
  };

  // Auto-generate password when options change OR on reset
  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSpecialChars, generatePassword]);

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F4F5F7]">
        <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-6 bg-white">
          <h1 className="text-2xl font-semibold text-center text-[#374151] mb-4">
            🔐 Password Generator
          </h1>

          {/* Password Display and Copy Button */}
          <div className="flex shadow-sm rounded-lg overflow-hidden mb-4 bg-[#E5E7EB]">
            <input
              type="text"
              value={password}
              className="w-full px-4 py-2 text-[#374151] bg-transparent focus:outline-none"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyToClipboard}
              className="px-4 bg-[#2563EB] text-white hover:bg-[#1E40AF] transition cursor-pointer">
              Copy
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Password Length Slider */}
            <div className="flex items-center justify-between">
              <label className="text-[#374151] font-medium">Length: {length}</label>
              <input
                type="range"
                min={7}
                max={20}
                value={length}
                className="cursor-pointer w-32"
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>

            {/* Include Numbers Checkbox */}
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={includeNumbers}
                id="numbersCheckbox"
                onChange={() => setIncludeNumbers((prev) => !prev)}
                className="cursor-pointer"
              />
              <label htmlFor="numbersCheckbox" className="text-[#374151]">
                Include Numbers (0-9)
              </label>
            </div>

            {/* Include Special Characters Checkbox */}
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={includeSpecialChars}
                id="specialCharsCheckbox"
                onChange={() => setIncludeSpecialChars((prev) => !prev)}
                className="cursor-pointer" />
              <label htmlFor="specialCharsCheckbox" className="text-[#374151]">
                Include Special Characters (!@#$%^&*)
              </label>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                resetSettings();
                generatePassword(); // Reset ke baad naya password bhi generate ho jaye
              }}
              className="w-full py-2 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition cursor-pointer">
              Reset 🔄
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
