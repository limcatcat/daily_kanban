import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function CongratsModal(props) {

    useEffect(() => {
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
          };
          
          function shoot() {
            confetti({
              ...defaults,
              particleCount: 90,
              scalar: 1.2,
              shapes: ["circle", "square"],
              colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
            });
          
            confetti({
              ...defaults,
              particleCount: 60,
              scalar: 2,
              shapes: ["emoji"],
              shapeOptions: {
                emoji: {
                  value: ["💗", "🩵", "💚", "🐙", "🍀", "🍑", "🍋", "🌸", "🔥", "🐶"],
                },
              },
            });
          }
          
          setTimeout(shoot, 0);
          setTimeout(shoot, 100);
          setTimeout(shoot, 200);

        // confetti({
        //     particleCount: 300,
        //     spread: 90,
        //     origin: { x: 0, y: 0.9 },
        //   });

        //   confetti({
        //     particleCount: 300,
        //     spread: 90,
        //     origin: { x: 1, y: 0.9 },
        //   }, []);
    })

    return (
        <Modal
            {...props}
            dialogClassName="modal-10w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Woooow, you've just completed your {props.count}th task!
          </p>
          <p>  
            Now, go treat yourself!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.onHide}>For sure!</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default CongratsModal;