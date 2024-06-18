import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";

const ClubMembers = ({ id }) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Dummy data for initial display
  useEffect(() => {
    const initialMembers = [
      { id: 1, name: "김동아", role: "회장", status: "승인" },
      { id: 2, name: "이부회", role: "부회장", status: "승인" },
      { id: 3, name: "박총무", role: "총무", status: "승인" },
      { id: 4, name: "정통장", role: "회원", status: "승인" },
      { id: 5, name: "홍길동", role: "회원", status: "승인" },
      { id: 6, name: "김철수", role: "회원", status: "승인" },
    ];

    const fetchClubData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/club/${id}`);
        console.log(res)

        setMembers(res.data.members);
      } catch (error) {
        console.error(error);
      }
    }

    setMembers(initialMembers);
    fetchClubData();
  }, []);

  const handleSelectMember = (event, memberId) => {
    if (event.target.checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  const handleBulkRemove = async () => {
    try {
      const res = await axios.delete(process.env.REACT_APP_SERVER_URL + `/club/${id}/dismiss/${selectedMembers[0]}`)
      setMembers(members.filter((member) => !selectedMembers.includes(member.id)));
      setSelectedMembers([]);
      alert("선택된 부원이 탈퇴 처리되었습니다.");
    } catch (error) {
      alert(error.response.data)
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedMembers.length > 0 && selectedMembers.length < members.length}
                  checked={members.length > 0 && selectedMembers.length === members.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedMembers(members.map((member) => member.id));
                    } else {
                      setSelectedMembers([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>이름</TableCell>
              <TableCell>역할</TableCell>
              {/* <TableCell>상태</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    onChange={(event) => handleSelectMember(event, member.id)}
                  />
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                {/* <TableCell>{member.status}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBulkRemove}
        disabled={selectedMembers.length === 0}
        sx={{ marginTop: 2 }}
      >
        선택된 부원 탈퇴 처리
      </Button>
    </div>
  );
};

export default ClubMembers;
