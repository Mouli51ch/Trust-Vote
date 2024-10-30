// First, create a new file src/components/VotingForm/index.tsx

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Users, 
  Shield, 
  Clock, 
  Check,
  Info,
  Loader,
  AlertCircle,
  Plus

} from 'lucide-react';

interface VotingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  options: string[];
  minVoters: number;
  maxVoters: number;
  requireKYC: boolean;
  chainType: 'public' | 'private';
}

const VotingForm: React.FC<VotingFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    options: ['', ''],
    minVoters: 2,
    maxVoters: 1000,
    requireKYC: true,
    chainType: 'public'
  });

  const handleAddOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const handleRemoveOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Here you would integrate with your blockchain
    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Voting contract deployed successfully!');
      onClose();
    } catch (error) {
      alert('Error deploying voting contract');
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create New Vote</h2>
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-1 rounded-full ${
                      step <= currentStep ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vote Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter vote title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Describe your vote"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Start Date
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        End Date
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Voting Options
                    </label>
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                          placeholder={`Option ${index + 1}`}
                        />
                        {index > 1 && (
                          <button
                            onClick={() => handleRemoveOption(index)}
                            className="p-2 text-red-500 hover:text-red-400"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    {formData.options.length < 10 && (
                      <button
                        onClick={handleAddOption}
                        className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                      >
                        <Plus size={16} /> Add Option
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Minimum Voters
                      </label>
                      <input
                        type="number"
                        value={formData.minVoters}
                        onChange={(e) => setFormData(prev => ({ ...prev, minVoters: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        min="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Maximum Voters
                      </label>
                      <input
                        type="number"
                        value={formData.maxVoters}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxVoters: parseInt(e.target.value) }))}
                        className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        min={formData.minVoters}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">
                        Require KYC
                      </label>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, requireKYC: !prev.requireKYC }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.requireKYC ? 'bg-blue-500' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.requireKYC ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Blockchain Type
                      </label>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, chainType: 'public' }))}
                          className={`flex-1 px-4 py-2 rounded-lg border ${
                            formData.chainType === 'public'
                              ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-400'
                              : 'border-gray-700 text-gray-400 hover:border-blue-500'
                          }`}
                        >
                          Public Chain
                        </button>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, chainType: 'private' }))}
                          className={`flex-1 px-4 py-2 rounded-lg border ${
                            formData.chainType === 'private'
                              ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-400'
                              : 'border-gray-700 text-gray-400 hover:border-blue-500'
                          }`}
                        >
                          Private Chain
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-2 text-gray-300 hover:text-white"
                  >
                    Back
                  </button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin" size={16} />
                          Deploying Contract...
                        </>
                      ) : (
                        <>
                          <Shield size={16} />
                          Deploy Voting Contract
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VotingForm;