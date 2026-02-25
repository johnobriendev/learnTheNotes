// src/pages/lessons/SwitchingScalePatterns.tsx
import LessonLayout from '../../components/LessonLayout';
import ScaleDiagram from '../../components/scales/ScaleDiagram';
import { getAllThreeNotesPerStringPatterns } from '../../utils/patternUtils';

const SwitchingScalePatterns = () => {
  // Get all patterns for G Major
  const threeNPSPatterns = getAllThreeNotesPerStringPatterns('G', 'major');

  // Select specific patterns for the lesson
  // 3NPS: Pattern 2 and Pattern 3
  const pattern2_3NPS = threeNPSPatterns[1]; // 2nd pattern (index 1)
  const pattern3_3NPS = threeNPSPatterns[2]; // 3rd pattern (index 2)

  // Create a grid displaying the 2 3NPS patterns
  const allPatternsGrid = (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScaleDiagram pattern={pattern2_3NPS} displayMode="notes" />
        <ScaleDiagram pattern={pattern3_3NPS} displayMode="notes" />
      </div>
    </div>
  );

  const textContent = (
    <>
      <p className="mb-4">
        In this lesson we'll explore how adding a 4th note to any string in a 3-note-per-string pattern helps us switch positions easily. 
      </p>

      <h3 className="text-xl font-semibold mb-3">Practice Exercises</h3>

      <h4 className='font-semibold'>Exercise 1</h4>
      <p>Ascending first pattern</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|----------------------------------5-7-8-10-|
B|----------------------------5-7-8----------|
G|----------------------4-5-7----------------|
D|---------------4-5-7-----------------------|
A|--------3-5-7------------------------------|
E|-3-5-7-------------------------------------|`}
        </pre>
      </div>

      <p>Descending second pattern, here the 4th note and position switch is on the first string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-10-8-7------------------------------------|
B|---------10-8-7----------------------------|
G|-----------------9-7-5---------------------|
D|-----------------------9-7-5---------------|
A|-----------------------------9-7-5---------|
E|-----------------------------------8-7-5-3-|`}
        </pre>
      </div>


      <h4 className='font-semibold'>Exercise 2</h4>
      <p>This time we will make the switch on the 2nd string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|------------------------------------7-8-10-|
B|----------------------------5-7-8-10-------|
G|----------------------4-5-7----------------|
D|---------------4-5-7-----------------------|
A|--------3-5-7------------------------------|
E|-3-5-7-------------------------------------|`}
        </pre>
      </div>

      <p>Descending we also switch on the second string, in doing so we have effectively combined two patterns</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-10-8-7------------------------------------|
B|--------10-8-7-5---------------------------|
G|------------------7-5-4--------------------|
D|------------------------7-5-4--------------|
A|-------------------------------7-5-3-------|
E|-------------------------------------7-5-3-|`}
        </pre>
      </div>

      <h4 className='font-semibold'>Exercise 3</h4>
      <p>Now we do the same but switch on the 3rd string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|------------------------------------7-8-10-|
B|------------------------------7-8-10-------|
G|----------------------4-5-7-9--------------|
D|---------------4-5-7-----------------------|
A|--------3-5-7------------------------------|
E|-3-5-7-------------------------------------|`}
        </pre>
      </div>

      <p>Notice in each of these exercises we go from the same lowest note (G) to the same highest note (D). All that changes is what string we addthe fourth note on</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-10-8-7------------------------------------|
B|--------10-8-7-----------------------------|
G|----------------9-7-5-4--------------------|
D|------------------------7-5-4--------------|
A|-------------------------------7-5-3-------|
E|-------------------------------------7-5-3-|`}
        </pre>
      </div>
          
      <h4 className='font-semibold'>Continuing your studies</h4>    
      <p>The next exercises you should do should be making the switch on the 4th, 5th, and 6th strings. By doing this you will have full control of when and where you can switch between patterns. Eventually you should do this will all 7 three-note-per-string patterns.</p>

    
    </>
  );

  return (
    <LessonLayout
      title="Switching Between Scale Patterns"
      difficulty="intermediate"
      diagram={allPatternsGrid}
      textContent={textContent}
      videoUrl="/SwitchingScalePatterns.mp4"
      videoTitle="Switching Between Scale Patterns"
    />
  );
};

export default SwitchingScalePatterns;
