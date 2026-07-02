import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingCalendar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const availableDates = [5, 8, 12, 15, 19, 22, 26, 29];
  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  const days = [];
  for (let i = 0; i < firstDayOfMonth(currentMonth); i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth(currentMonth); i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Select Your Date
          </h3>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h4 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h4>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-sm text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {days.map((day, idx) => (
            <motion.button
              key={idx}
              whileHover={day && availableDates.includes(day) ? { scale: 1.05 } : {}}
              onClick={() => day && availableDates.includes(day) && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
              disabled={!day || !availableDates.includes(day)}
              className={`aspect-square rounded-lg font-semibold transition-all ${
                day && availableDates.includes(day)
                  ? selectedDate?.getDate() === day
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  : "text-muted-foreground cursor-not-allowed"
              }`}
            >
              {day}
            </motion.button>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t pt-6"
          >
            <h4 className="font-semibold mb-4">Select Time</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>

            {selectedTime && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6"
              >
                <p className="text-sm text-muted-foreground mb-2">Your Selection:</p>
                <p className="font-semibold text-lg">
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                </p>
              </motion.div>
            )}

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Confirm Booking
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
