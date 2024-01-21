import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { quizData } from './QuizData';
import _ from 'lodash';

const QuizScreen: React.FC = () => {

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const [quizDatax, setQuizData] = useState(quizData.slice());

  const shuffleQuestions = () => {
    const shuffledQuizData = _.shuffle(quizDatax);
    setQuizData(shuffledQuizData);
  };

  const handleOptionPress = (questionIndex: number, optionIndex: number) => {
    const updatedQuizData = [...quizDatax];
    
    // กำหนดค่า selected ของทุกตัวเลือกในคำถามนี้เป็น false ก่อน
    updatedQuizData[questionIndex].options.forEach(opt => {
      opt.selected = false;
    });
  
    // ตั้งค่า selected ของตัวเลือกที่ถูกเลือกใหม่
    updatedQuizData[questionIndex].options[optionIndex].selected = true;
  
    setQuizData(updatedQuizData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizDatax.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={styles.questionText}>{`ข้อ ${questionIndex + 1}. ${question.question}`}</Text>
          {question.options.map((opt, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    opt.selected && opt.correct
                      ? 'green' // ถูกและถูกเลือก (เขียว)
                      : opt.selected
                        ? 'red' // ผิดและถูกเลือก (แดง)
                        : 'white', // ไม่ได้เลือก (ค่าเริ่มต้น)
                },
              ]}
              onPress={() => handleOptionPress(questionIndex, optionIndex)}
            >
              <Text style={styles.optionText}>{opt.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  questionContainer: {
    width: '100%',
    marginBottom: 16,
  },
  questionText: {
    alignItems: 'flex-start',
    fontSize: 18,
    marginBottom: 8,
  },
  optionButton: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuizScreen;
