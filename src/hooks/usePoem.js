import { useState, useEffect } from "react";

export default function usePoem() {
  const [poem, setPoem] = useState(null);
  useEffect(() => {
    const jinrishici = require("jinrishici");
    jinrishici.load((result) => {
      setPoem(result.data);
    });
  }, []);
  return [poem, setPoem];
}
