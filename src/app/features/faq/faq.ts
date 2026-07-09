import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  items: FAQItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class FaqComponent {
  // الـ Category الحالية النشطة
  activeCategory = signal<string>('general');
  
  // الـ ID بتاع السؤال المفتوح حالياً (null يعني كله مقفول)
  openQuestionId = signal<number | null>(1); // افتراضياً أول سؤال مفتوح زي الصورة

  // الداتا مقسمة وجاهزة
  faqData = signal<FAQCategory[]>([
    {
      id: 'general',
      name: 'General Questions',
      icon: 'fa-solid fa-circle-question',
      items: [
        { id: 1, question: 'What destinations do you cover?', answer: 'We specialize in Egypt and Jordan, offering a wide range of tours covering major attractions and hidden gems in both countries.' },
        { id: 2, question: 'How can I book a tour?', answer: 'You can book directly through our website or contact our team via email or phone for assistance.' },
        { id: 3, question: 'Are your tours private or group-based?', answer: 'We offer both private and small group tours depending on your preference and budget.' },
        { id: 4, question: 'Do you offer customized itineraries?', answer: 'Yes, we can tailor your trip based on your interests, travel dates, and budget.' }
      ]
    },
    {
      id: 'booking',
      name: 'Booking & Payment',
      icon: 'fa-solid fa-credit-card',
      items: [
        { id: 5, question: 'What payment methods do you accept?', answer: 'We accept bank transfers, credit cards, and online payment methods.' },
        { id: 6, question: 'Is a deposit required to confirm booking?', answer: 'Yes, a deposit is required to secure your booking, with the remaining balance paid before arrival.' },
        { id: 7, question: 'Can I cancel or modify my booking?', answer: 'Yes, cancellations and modifications are possible according to our cancellation policy.' }
      ]
    },
    {
      id: 'travel',
      name: 'Travel & Experience',
      icon: 'fa-solid fa-compass',
      items: [
        { id: 8, question: 'Are flights included in the packages?', answer: 'International flights are not included unless stated otherwise.' },
        { id: 9, question: 'Do I need a visa to travel?', answer: 'Visa requirements depend on your nationality. We can guide you through the process.' },
        { id: 10, question: 'Is travel insurance included?', answer: 'Travel insurance is not included but highly recommended.' },
        { id: 11, question: 'What languages do your guides speak?', answer: 'Our guides speak multiple languages including English, Italian, Spanish, and more.' },
        { id: 12, question: 'Is it safe to travel to Egypt and Jordan?', answer: 'Yes, both destinations are generally safe for tourists, and we ensure all safety measures are in place.' }
      ]
    }
  ]);

  // الـ computed signal عشان يجيب الأسئلة بتاعة الـ Category المختارة حالياً تلقائياً
  filteredQuestions = computed(() => {
    const category = this.faqData().find(c => c.id === this.activeCategory());
    return category ? category.items : [];
  });

  // فانكشن لتبديل الفتح والقفل للأسئلة
  toggleQuestion(id: number) {
    if (this.openQuestionId() === id) {
      this.openQuestionId.set(null); // لو مضغوط عليه وهو مفتوح يقفل
    } else {
      this.openQuestionId.set(id); // يفتح الجديد
    }
  }

  // فانكشن لتغيير الـ Category
  setCategory(categoryId: string) {
    this.activeCategory.set(categoryId);
    // تصفير أو فتح أول سؤال في الفئة الجديدة لشكل جمالي
    const firstQuestion = this.faqData().find(c => c.id === categoryId)?.items[0];
    this.openQuestionId.set(firstQuestion ? firstQuestion.id : null);
  }
}