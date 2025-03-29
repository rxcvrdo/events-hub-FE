import  { useState } from "react";
import { EventFormStepProps } from ".";
import { Button, Form, Input, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const General = ({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
}: EventFormStepProps) => {
  const [guestInputValue, setGuestInputValue] = useState("");
  const navigate = useNavigate();

  const onGuestAdd = () => {
    const existingGuest = eventData.guests || [];
    const newGuests = guestInputValue.split(",");
    setEventData({ ...eventData, guests: [...existingGuest, ...newGuests] });
  };

  const onGuestRemove = (index: number) => {
    const existingGuest = eventData.guests || [];
    const newGuests = existingGuest.filter(
      (_guest: any, i: number) => i !== index
    );
    setEventData({ ...eventData, guests: newGuests });
  };

  return (
    <div className="flex flex-col gap-6">
      <Form.Item label="Event Name" required>
        <Input
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description" required>
        <Input.TextArea
          placeholder="Description"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Organiser" required>
        <Input
          placeholder="Organiser"
          value={eventData.organiser}
          onChange={(e) =>
            setEventData({ ...eventData, organiser: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Guests list (comma separated)">
        <div className="flex gap-5">
          <Input
            placeholder="Guests list"
            value={guestInputValue}
            onChange={(e) => setGuestInputValue(e.target.value)}
          />
          <Button onClick={onGuestAdd} disabled={!guestInputValue}>
            Add
          </Button>
        </div>
      </Form.Item>
      <div className="flex flex-wrap gap-5">
        {eventData.guests?.map((guest: string, index: number) => (
          <Tag key={guest} closable onClose={() => onGuestRemove(index)}>
            {guest}
          </Tag>
        ))}
      </div>

      <div className="flex gap-10 justify-between">
        <Button onClick={() => navigate("/admin/events")}>Back</Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!eventData.name || !eventData.description || !eventData.organiser}
          >
          Next
        </Button>
      </div>
    </div>
  );
};

export default General;
