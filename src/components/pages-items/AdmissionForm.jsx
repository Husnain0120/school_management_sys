'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Building,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Home,
  Info,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Upload,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    currentAddress: '',
    permanentAddress: '',
    city: '',
    zipCode: '',
    admissionClass: '',
    previousSchool: '',
  });

  const [studentPhoto, setStudentPhoto] = useState('');
  const [idProof, setIdProof] = useState('');
  const [birthCertificate, setBirthCertificate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const studentPhotoRef = useRef(null);
  const idProofRef = useRef(null);
  const birthCertRef = useRef(null);

  // Progress calculation
  useEffect(() => {
    const totalFields = 14;
    const filledFields = [
      formData.fullName,
      formData.fatherName,
      formData.email,
      formData.gender,
      formData.dateOfBirth,
      formData.currentAddress,
      formData.permanentAddress,
      formData.city,
      formData.zipCode,
      formData.admissionClass,
      studentPhoto,
      idProof,
      birthCertificate,
    ].filter(Boolean).length;

    const progressPercentage = Math.round((filledFields / totalFields) * 100);
    setProgress(progressPercentage);
  }, [formData, studentPhoto, idProof, birthCertificate]);

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoadingClasses(true);
      setApiError(null);
      try {
        const response = await axios.get(
          '/api/admin/classes-mange/create-class'
        );
        if (response.data.classes) {
          setClasses(response.data.classes);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
        setApiError(
          'Failed to load class options. Please refresh the page or try again later.'
        );
        toast.error('Failed to load class options');
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  useEffect(() => {
    const requiredFields = [
      formData.fullName,
      formData.fatherName,
      formData.email,
      formData.gender,
      formData.dateOfBirth,
      formData.currentAddress,
      formData.permanentAddress,
      formData.city,
      formData.zipCode,
      formData.admissionClass,
      studentPhoto,
      idProof,
      birthCertificate,
    ];
    setIsFormValid(requiredFields.every(field => Boolean(field)));
  }, [formData, studentPhoto, idProof, birthCertificate]);

  const handleClose = () => {
    router.back();
  };

  const handleImagePreview = (e, setImage, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Please upload a valid image file',
      }));
      toast.error('Please upload a valid image file');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'File size should be less than 10MB',
      }));
      toast.error('File size should be less than 10MB');
      return;
    }

    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's name is required";

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.currentAddress.trim())
      newErrors.currentAddress = 'Current address is required';
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = 'Permanent address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.admissionClass)
      newErrors.admissionClass = 'Admission class is required';

    if (!studentPhoto) newErrors.studentPhoto = 'Student photo is required';
    if (!idProof) newErrors.idProof = 'ID proof is required';
    if (!birthCertificate)
      newErrors.birthCertificate = 'Birth certificate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      const firstErrorField = Object.keys(errors)[0];
      document
        .getElementsByName(firstErrorField)?.[0]
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (studentPhoto) {
        const blob = await fetch(studentPhoto).then(r => r.blob());
        formDataToSend.append('studentPhoto', blob, 'student-photo.jpg');
      }

      if (idProof) {
        const blob = await fetch(idProof).then(r => r.blob());
        formDataToSend.append('idProof', blob, 'id-proof.jpg');
      }

      if (birthCertificate) {
        const blob = await fetch(birthCertificate).then(r => r.blob());
        formDataToSend.append(
          'birthCertificate',
          blob,
          'birth-certificate.jpg'
        );
      }

      const res = await axios.post(`/api/admission`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        toast.success(
          res.data.message || 'Admission form submitted successfully!'
        );
        router.push('/pages/succes');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      if (
        error.response?.status === 400 &&
        error.response.data?.message?.includes('Email already registered')
      ) {
        setErrors(prev => ({
          ...prev,
          email: 'Email already registered. Please use another email.',
        }));
        document
          .getElementsByName('email')[0]
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (error.response?.data?.message?.includes('File size')) {
        toast.error(
          'File size exceeds the maximum limit of 10MB. Please upload smaller files.'
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            'Failed to submit form. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-gray-100">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-white border-4 border-white">
                <Loader2 className="h-6 w-6 text-orange-600 animate-spin" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Submitting Application
            </h3>
            <p className="text-gray-600 text-center text-sm mb-4">
              Please wait while we process your admission form
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress + 20, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-gray-900">Edu</span>
                  <span className="text-orange-600">Manage</span>
                </h1>
                <p className="text-sm text-gray-500">
                  Admission Portal 2024-25
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Admission Application
                </h2>
                <p className="text-gray-600 text-sm">
                  Complete all sections to submit your application
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">
                  {progress}%
                </div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <form onSubmit={handleFormSubmit} className="space-y-8 p-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Personal Information
                      </h2>
                    </div>
                    {Object.keys(errors).filter(key =>
                      [
                        'fullName',
                        'fatherName',
                        'email',
                        'gender',
                        'dateOfBirth',
                      ].includes(key)
                    ).length > 0 && (
                      <span className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Needs attention
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        id: 'fullName',
                        label: "Student's Full Name",
                        icon: User,
                        placeholder: 'Enter full name',
                        required: true,
                      },
                      {
                        id: 'fatherName',
                        label: "Father's Name",
                        icon: User,
                        placeholder: "Enter father's name",
                        required: true,
                      },
                      {
                        id: 'email',
                        label: 'Email Address',
                        icon: Mail,
                        placeholder: 'student@example.com',
                        type: 'email',
                        required: true,
                      },
                      {
                        id: 'dateOfBirth',
                        label: 'Date of Birth',
                        icon: Calendar,
                        type: 'date',
                        required: true,
                      },
                    ].map(field => (
                      <div key={field.id} className="space-y-2">
                        <Label
                          htmlFor={field.id}
                          className={`text-sm font-semibold flex items-center gap-2 ${errors[field.id] ? 'text-red-500' : 'text-gray-700'}`}
                        >
                          {field.icon && <field.icon className="h-4 w-4" />}
                          {field.label}{' '}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.id}
                          type={field.type || 'text'}
                          className={`rounded-lg h-11 ${errors[field.id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                          value={formData[field.id]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                        />
                        {errors[field.id] && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Gender Select */}
                    <div className="space-y-2">
                      <Label
                        className={`text-sm font-semibold flex items-center gap-2 ${errors.gender ? 'text-red-500' : 'text-gray-700'}`}
                      >
                        <User className="h-4 w-4" />
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        name="gender"
                        onValueChange={value =>
                          handleSelectChange('gender', value)
                        }
                        value={formData.gender}
                      >
                        <SelectTrigger
                          className={`rounded-lg h-11 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Address Details
                      </h2>
                    </div>
                    {Object.keys(errors).filter(key =>
                      [
                        'currentAddress',
                        'permanentAddress',
                        'city',
                        'zipCode',
                      ].includes(key)
                    ).length > 0 && (
                      <span className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Needs attention
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        id: 'currentAddress',
                        label: 'Current Address',
                        icon: Home,
                        placeholder: 'Enter current address',
                        required: true,
                      },
                      {
                        id: 'permanentAddress',
                        label: 'Permanent Address',
                        icon: Home,
                        placeholder: 'Enter permanent address',
                        required: true,
                      },
                      {
                        id: 'city',
                        label: 'City',
                        icon: MapPin,
                        placeholder: 'Enter city',
                        required: true,
                      },
                      {
                        id: 'zipCode',
                        label: 'Zip Code',
                        icon: Globe,
                        placeholder: '12345',
                        required: true,
                      },
                    ].map(field => (
                      <div key={field.id} className="space-y-2">
                        <Label
                          htmlFor={field.id}
                          className={`text-sm font-semibold flex items-center gap-2 ${errors[field.id] ? 'text-red-500' : 'text-gray-700'}`}
                        >
                          {field.icon && <field.icon className="h-4 w-4" />}
                          {field.label}{' '}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.id}
                          className={`rounded-lg h-11 ${errors[field.id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                          value={formData[field.id]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                        />
                        {errors[field.id] && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Camera className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Document Upload
                      </h2>
                    </div>
                    {Object.keys(errors).filter(key =>
                      ['studentPhoto', 'idProof', 'birthCertificate'].includes(
                        key
                      )
                    ).length > 0 && (
                      <span className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Needs attention
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        ref: studentPhotoRef,
                        value: studentPhoto,
                        setter: setStudentPhoto,
                        error: errors.studentPhoto,
                        label: 'Student Photo',
                        description: 'Recent passport size photo',
                        icon: User,
                        fieldName: 'studentPhoto',
                      },
                      {
                        ref: idProofRef,
                        value: idProof,
                        setter: setIdProof,
                        error: errors.idProof,
                        label: 'ID Proof',
                        description: 'Student ID or Aadhar card',
                        icon: Shield,
                        fieldName: 'idProof',
                      },
                      {
                        ref: birthCertRef,
                        value: birthCertificate,
                        setter: setBirthCertificate,
                        error: errors.birthCertificate,
                        label: 'Birth Certificate',
                        description: 'Official birth certificate',
                        icon: FileText,
                        fieldName: 'birthCertificate',
                      },
                    ].map((doc, idx) => (
                      <div key={idx} className="space-y-2">
                        <Label
                          className={`text-sm font-semibold ${doc.error ? 'text-red-500' : 'text-gray-700'}`}
                        >
                          {doc.label} <span className="text-red-500">*</span>
                        </Label>
                        <input
                          type="file"
                          ref={doc.ref}
                          onChange={e =>
                            handleImagePreview(e, doc.setter, doc.fieldName)
                          }
                          className="hidden"
                          accept="image/*"
                        />
                        <div
                          className={`border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                            doc.error
                              ? 'border-red-400 bg-red-50'
                              : doc.value
                                ? 'border-green-400 bg-green-50'
                                : 'border-gray-300 hover:border-orange-400'
                          }`}
                          onClick={() => doc.ref.current?.click()}
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            {doc.value ? (
                              <>
                                <div className="relative">
                                  <img
                                    src={doc.value}
                                    alt={doc.label}
                                    className="h-32 w-32 object-cover rounded-lg border-4 border-white shadow-md"
                                  />
                                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white p-1 rounded-full">
                                    <CheckCircle className="h-4 w-4" />
                                  </div>
                                </div>
                                <p className="text-sm font-medium text-green-700">
                                  Uploaded
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium text-gray-700">
                                    Click to upload
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {doc.description}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {doc.error && (
                          <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {doc.error}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Academic Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Admission Class */}
                    <div className="space-y-2">
                      <Label
                        className={`text-sm font-semibold flex items-center gap-2 ${errors.admissionClass ? 'text-red-500' : 'text-gray-700'}`}
                      >
                        <GraduationCap className="h-4 w-4" />
                        Admission Class <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        name="admissionClass"
                        onValueChange={value =>
                          handleSelectChange('admissionClass', value)
                        }
                        value={formData.admissionClass}
                        disabled={isLoadingClasses || apiError}
                      >
                        <SelectTrigger
                          className={`rounded-lg h-11 ${errors.admissionClass ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <SelectValue
                            placeholder={
                              isLoadingClasses
                                ? 'Loading classes...'
                                : 'Select Class'
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingClasses ? (
                            <div className="flex items-center justify-center p-2">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Loading classes...</span>
                            </div>
                          ) : classes.length > 0 ? (
                            classes.map(classItem => (
                              <SelectItem
                                key={classItem._id}
                                value={classItem.name}
                              >
                                {classItem.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="No class yet">
                              No class yet
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {errors.admissionClass && (
                        <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.admissionClass}
                        </p>
                      )}
                    </div>

                    {/* Previous School */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="previousSchool"
                        className="text-sm font-semibold flex items-center gap-2 text-gray-700"
                      >
                        <Building className="h-4 w-4" />
                        Previous School Name
                      </Label>
                      <Input
                        id="previousSchool"
                        name="previousSchool"
                        className="rounded-lg h-11 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        placeholder="Leave blank if not applicable"
                      />
                    </div>
                  </div>
                </div>

                {/* API Error Alert */}
                {apiError && (
                  <Alert
                    variant="destructive"
                    className="border-red-200 bg-red-50"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-red-800">Error</AlertTitle>
                    <AlertDescription className="text-red-700">
                      {apiError}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Important Information */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Important Information
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-white border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-orange-600 text-xs font-bold">
                              1
                            </span>
                          </div>
                          <span>All fields marked with * are mandatory</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-white border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-orange-600 text-xs font-bold">
                              2
                            </span>
                          </div>
                          <span>
                            Original documents must be submitted for
                            verification
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-white border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-orange-600 text-xs font-bold">
                              3
                            </span>
                          </div>
                          <span>All uploaded files must be less than 10MB</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-white border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-orange-600 text-xs font-bold">
                              4
                            </span>
                          </div>
                          <span>
                            Default password will be provided upon approval
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full rounded-lg h-12 text-lg font-semibold shadow-lg transition-all duration-300 ${
                    isFormValid && !isSubmitting
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Submit Admission Application</span>
                    </div>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Already registered?{' '}
                    <Link
                      href="/pages/login"
                      className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                    >
                      Login with your Portal ID
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Application Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Personal Info</span>
                  <CheckCircle
                    className={`h-5 w-5 ${
                      formData.fullName &&
                      formData.fatherName &&
                      formData.email &&
                      formData.gender &&
                      formData.dateOfBirth
                        ? 'text-green-500'
                        : 'text-gray-300'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Address Details</span>
                  <CheckCircle
                    className={`h-5 w-5 ${
                      formData.currentAddress &&
                      formData.permanentAddress &&
                      formData.city &&
                      formData.zipCode
                        ? 'text-green-500'
                        : 'text-gray-300'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents</span>
                  <CheckCircle
                    className={`h-5 w-5 ${
                      studentPhoto && idProof && birthCertificate
                        ? 'text-green-500'
                        : 'text-gray-300'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Academic Details
                  </span>
                  <CheckCircle
                    className={`h-5 w-5 ${
                      formData.admissionClass
                        ? 'text-green-500'
                        : 'text-gray-300'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl text-white p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-400" />
                Need Help?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Call Support</div>
                    <div className="font-semibold">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Email Support</div>
                    <div className="font-semibold">
                      admissions@edumanage.com
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push('/pages/contact');
                }}
                className="w-full cursor-pointer mt-6 bg-white text-gray-900 hover:bg-gray-100 font-semibold"
              >
                Contact Support
              </Button>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Admission Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">1.5k</div>
                  <div className="text-xs text-gray-600">Applications</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <div className="text-xs text-gray-600">Approval Rate</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Average processing time: 3-5 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
