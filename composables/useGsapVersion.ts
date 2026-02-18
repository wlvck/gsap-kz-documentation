export const useGsapVersion = () => {
  const version = useState<string>("gsap-version", () => "3.12.5");

  const fetchVersion = async () => {
    try {
      const res = await fetch("https://registry.npmjs.org/gsap/latest");
      const data = await res.json();
      if (data.version) {
        version.value = data.version;
      }
    } catch {
      // Keep fallback version
    }
  };

  return {
    version: readonly(version),
    fetchVersion,
  };
};
