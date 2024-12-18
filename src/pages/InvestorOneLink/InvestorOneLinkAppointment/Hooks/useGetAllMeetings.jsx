import { useEffect, useState } from "react";
import { getAllMeetings } from "../../../../Service/user";

export default function useGetAllMeetings(userId) {
  const [meetingsData, setMeetingsData] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function getMeetings(userId) {
      // Set loading
      setLoading(true);
      try {
        const { data } = await getAllMeetings(userId);

        const result = data.map((meeting, index) => {
          return {
            ...meeting,
            start: new Date(meeting.start),
            end: new Date(meeting.end),
          };
        });

        // Save to State
        setMeetingsData(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getMeetings(userId);
  }, [userId]);

  //   console.log("from hook", meetingsData, userId);

  return { loading, meetingsData };
}
