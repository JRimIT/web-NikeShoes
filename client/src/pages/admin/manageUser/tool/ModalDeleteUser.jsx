import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlignItem from "./content/detailUserDelete";
import { deleteUserById } from "../../../../data/api/apiService";
import { toast } from "react-toastify";
import DotLoader from "react-spinners/DotLoader";

function ModalDeleteUser(props) {
  const { show, setShow, data } = props;
  const [loading, setLoading] = useState(false);

  const handleKick = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const res = await deleteUserById(data.user_id);
        toast.success("Delete user success");
        setShow(false);
        await props.fetchAllUsers();
      } catch (error) {
        toast.error("Delete fail");
        console.log(error);
      }
    }, 3000);
  };

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            DELETE USER
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AlignItem data={data}></AlignItem>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleKick}
            disabled={loading ? true : false}
          >
            {loading ? (
              <DotLoader
                color={"#ffffff"}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>Kick</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
