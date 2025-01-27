import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import styles from './App.module.css';
function App() {
    const [program, setProgram] = useState("");
    const [timeComplexity, setTimeComplexity] = useState("");
  
    const handleProgramChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setProgram(event.target.value);
    };
  
    const calculateTimeComplexity = () => {
      try {
        const timeComplexity = calculateProgramTimeComplexity(program);
        setTimeComplexity(timeComplexity);
      } catch (error) {
        console.error("Error calculating time complexity:", error);
      }
    };
  
    const calculateProgramTimeComplexity = (program: string): string => {
      const lines = program.trim().split("\n");
      let maxLoopDepth = 0;
  
      for (let line of lines) {
        const loopDepth = getLoopDepth(line);
        maxLoopDepth = Math.max(maxLoopDepth, loopDepth);
      }
  
      if (maxLoopDepth === 0) {
        return "O(1)";
      } else {
        return `O(n^${maxLoopDepth})`;
      }
    };
  
    const getLoopDepth = (line: string): number => {
      const loopKeywords = ["for", "while", "do"];
      let depth = 0;
  
      for (let keyword of loopKeywords) {
        if (line.includes(keyword)) {
          depth++;
        }
      }
  
      return depth;
    };
  
    return (
        <div className={styles.App}>
        <h1 className={styles.heading}>Time Complexity Calculator</h1>
        <textarea
          value={program}
          onChange={handleProgramChange}
          placeholder="Enter your program here..."
          className={styles.textarea}
        />
        <button onClick={calculateTimeComplexity} className={styles.button}>
          Calculate Time Complexity
        </button>
        <h2 className={styles.result}>Time Complexity: {timeComplexity}</h2>
      </div>
    );
  }
  
  export default App;