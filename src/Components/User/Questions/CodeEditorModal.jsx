import React from 'react';
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror'

const CodeEditorModal = ({ isOpen, onClose, question, onSubmit }) => {
  const [userCode, setUserCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-Primary text-Gold p-6 rounded w-[90%] shadow-lg">
        <h2 className="text-xl font-bold mb-4">{question.questionName}</h2>

        <p className="mb-2 font-semibold">Sample Code:</p>
        <CodeMirror
          value={question.sampleCode}
          height="150px"

          readOnly={true}
          theme="dark"
        />

        <p className="mt-4 mb-2 font-semibold">Write Your Code:</p>
        <CodeMirror
          value={userCode}
          height="200px"
          onChange={(value) => setUserCode(value)}
          theme="dark"
        />

        <div className="flex justify-end mt-4 gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-Secondary text-Light hover:bg-Light hover:text-Secondary transition ease-in-out rounded">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(userCode, question.expectedOutput)}
            className="px-4 py-2 bg-Muted text-Gold hover:bg-Gold hover:text-Muted transition ease-in rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorModal;
