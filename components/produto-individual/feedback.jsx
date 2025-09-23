"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Feedback({ productId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFeedbacks = localStorage.getItem(`feedbacks-${productId}`);
      if (storedFeedbacks) {
        setFeedbacks(JSON.parse(storedFeedbacks));
      }
    }
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.trim() || newRating === 0) {
      alert("Por favor, preencha o comentário e selecione uma nota.");
      return;
    }

    const newId = feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1;
    const newFeedbackItem = {
      id: newId,
      user: "Você",
      rating: newRating,
      comment: newFeedback.trim()
    };
    
    const updatedFeedbacks = [...feedbacks, newFeedbackItem];
    setFeedbacks(updatedFeedbacks);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(`feedbacks-${productId}`, JSON.stringify(updatedFeedbacks));
    }
    
    setNewFeedback('');
    setNewRating(0);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Avaliações e Feedback</h2>

      {/* Seção de lista de feedbacks */}
      <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <Card key={feedback.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <User className="h-8 w-8 text-gray-500" />
                <div>
                  <CardTitle className="text-lg">{feedback.user}</CardTitle>
                  {renderStars(feedback.rating)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{feedback.comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Seja o primeiro a deixar um feedback!</p>
        )}
      </div>

      {/* Seção de envio de novo feedback */}
      <Card className="p-4 bg-white shadow-md">
        <h3 className="text-xl font-medium mb-3 text-gray-800">Deixe sua avaliação</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Sua nota:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer transition-colors ${i < newRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'}`}
                  onClick={() => setNewRating(i + 1)}
                />
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Escreva seu feedback aqui..."
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <Button type="submit" className="w-full bg-red-500 hover:bg-red-500 text-white font-bold py-2 rounded-md transition-colors">
            Enviar Feedback
          </Button>
        </form>
      </Card>
    </div>
  );
}