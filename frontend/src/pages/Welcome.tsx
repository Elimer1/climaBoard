import { useRef, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value ?? "";

    if (!name.trim()) {
      setError("Please enter a nickname");
      return;
    }
    localStorage.setItem("explorerName", name);
    navigate("/app");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="Enter Nickname" />
        <button type="submit">Enter</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Welcome;
