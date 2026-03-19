import { motion } from "framer-motion";

function JellyLoader({ numberOfCubes = 8 }) {

  const colors = [
    "#FFE4E1",
    "#FFB6C1",
    "#FF8A95",
    "#FF6B8A",
    "#E91E63",
    "#C2185B",
    "#AD1457",
    "#880E4F"
  ];

  const transition = {
    duration: 1.5,
    repeat: Infinity,
    repeatDelay: 0.5,
    ease: "easeOut"
  };

  return (
    <div
      style={{
        position: "relative",
        right: "60px",
        width: "150px",
        height: "200px",
        margin: "100px auto"
      }}
    >
      {Array.from({ length: numberOfCubes }).map((_, index) => {

        const x = index * 10;
        const y = -index * 10;

        return (
          <motion.span
            key={index}
            style={{
              position: "absolute",
              width: "200px",
              height: "300px",
              borderRadius: "100px",
              backgroundColor: colors[index],
              x,
              y,
              zIndex: numberOfCubes - index,
              opacity: 1 - index * 0.05
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 0.75, 1], rotate: [0, 360] }}
            transition={{
              ...transition,
              delay: index * 0.05
            }}
          />
        );
      })}
    </div>
  );
}

export default JellyLoader;