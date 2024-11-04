import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  addUserToBlackList,
  deleteAllReviewsByUserId,
  sendEmailBaned,
} from "../../../../../data/api/apiService";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../../../../utils/axios.customize";
import formEmail from "../contentEmail/email";

const ModalKickUser = (props) => {
  const { show, setShow, dataKickUser, fetchReviews } = props;
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const serviceId = "service_dhzbwr3";
  const templateId = "template_gpcwzbq";
  const publicKey = "C4RmHhhsqOwm2M1BR";

  console.log("service id: ", serviceId);
  console.log("templateId id: ", templateId);
  console.log("publicKey id: ", publicKey);

  const handleClose = () => setShow(false);

  const btnKick = (userId) => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      if (reason.trim() === "") return;

      const emailContent = formEmail(
        dataKickUser.username,
        dataKickUser.email,
        reason,
        "nikevnofficial@gmail.com"
      );
      const res = await addUserToBlackList(userId, reason);
      const resKick = await deleteAllReviewsByUserId(userId);
      await fetchReviews();
      setShow(false);

      let dataSend = {
        email: dataKickUser.email,
        subject: subject,
        message: emailContent,
      };

      const resEmail = await sendEmailBaned(dataSend);

      // deleteReview(id);
      // console.log(res);
      // console.log(resKick);
      // console.log("res Email: ", resEmail);
    }, 3000);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kick</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={dataKickUser.user_image} />
              </ListItemAvatar>
              <ListItemText
                primary={dataKickUser.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      Email: {dataKickUser.email}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) => setSubject(event.target.value)}
              />
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) => setReason(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => btnKick(dataKickUser.user_id)}
            disabled={loading ? true : false}
          >
            {loading ? (
              <ClipLoader
                color={"#ffffff"}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>KICK</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalKickUser;
