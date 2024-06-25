"use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const QuizAttempt = ({ searchParams }) => {
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
//   const userId = sessionStorage.getItem("user");
//   useEffect(() => {
//     const fetchQuizDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/Quizzes/${searchParams.quizId}`
//         );
//         console.log(response.data, "quizc");
//         setQuiz(response.data.result);
//       } catch (error) {
//         toast.error("Error fetching quiz details");
//       }
//     };

//     fetchQuizDetails();
//   }, [searchParams.quizId]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           handleSubmitQuiz();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleAnswerChange = (questionId, answer) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answer,
//     }));
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/Quizzes/${searchParams.quizId}/submit`,
//         {
//           userId: userId,
//           answers,
//         }
//       );

//       toast.success(
//         `You got ${response.data.correctAnswers} out of ${quiz.questions.length} correct!`
//       );
//     } catch (error) {
//       toast.error("Error submitting quiz");
//     }
//   };

//   if (!quiz) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             {quiz.title}
//           </h2>
//           <div className="text-lg text-gray-600 mb-4">{quiz.description}</div>
//           <div className="text-right text-red-500 text-xl">{`${Math.floor(
//             timeLeft / 60
//           )}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}</div>
//         </div>
//       </div>
//       <div className="mt-8">
//         {quiz.questions.map((question, index) => (
//           <div key={question.id} className="mb-6">
//             <h4 className="text-xl font-medium text-gray-800 mb-2">{`${
//               index + 1
//             }. ${question.question}`}</h4>
//             <div className="ml-4">
//               {question.options.map((option, optionIndex) => (
//                 <div key={optionIndex} className="mb-2">
//                   <label>
//                     <input
//                       type="radio"
//                       name={`question-${question.id}`}
//                       value={option}
//                       onChange={() => handleAnswerChange(question.id, option)}
//                     />
//                     {` ${option}`}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-8 text-center">
//         <button
//           onClick={handleSubmitQuiz}
//           className="bg-blue-500 text-white py-2 px-4 rounded-md"
//         >
//           Submit Quiz
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizAttempt;
"use client";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import utility from "@/components/utils/utility";
const QuizAttempt = ({ searchParams }) => {
  // const [timeLeft, setTimeLeft] = useState(600);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(240);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();
  // 3 minutes = 180 seconds
  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(
          utility.BASE_URL + `Quizzes/${searchParams.quizId}`
        );
        console.log(response.data, "quizc");
        setQuiz(response.data.result);
      } catch (error) {
        toast.error("Error fetching quiz details");
      }
    };

    fetchQuizDetails();
  }, [searchParams.quizId]);
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post(
        utility.BASE_URL + `Quizzes/${searchParams.quizId}/submit`,
        {
          userId: userId,
          quizId: searchParams.quizId,
          answers: Object.entries(answers).map(
            ([questionIndex, selectedAnswer]) => ({
              questionIndex: parseInt(questionIndex),
              selectedAnswer,
            })
          ),
        }
      );
      setIsModalOpen(true);
      setDialogMessage(
        `You got ${response.data.result.correctAnswersCount} questions out of ${quiz.questions.length} correct!`
      );
    } catch (error) {
      toast.error("Error submitting quiz");
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }
  const handleQuizClick = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {quiz.title}
          </h2>
          <div className="text-lg text-gray-600 mb-4">{quiz.description}</div>
          <div className="text-right text-red-500 text-xl">{`${Math.floor(
            timeLeft / 60
          )}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}</div>
        </div>
      </div>
      <div className="mt-8">
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-medium text-gray-800 mb-2">{`${
              index + 1
            }. ${question.question}`}</h4>
            <div className="ml-4">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    {` ${option}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmitQuiz}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit Quiz
        </button>
      </div>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Quiz Result
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {dialogMessage}
                            {/* <strong>{selectedCourse?.title}</strong>? */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => router.back()}
                    >
                      OK
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default QuizAttempt;
