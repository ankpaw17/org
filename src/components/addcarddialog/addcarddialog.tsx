import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AddCardDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const AddCardDialog = ({ open, setOpen }: AddCardDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const cardName = formJson.cardName;
        try {
            const response = await fetch('http://localhost:3001/my-cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "id": new Date().getTime().toString(),
                    "name": cardName,
                    "cardNumber": Array.from({length: 4}, () => Math.floor(1000 + Math.random() * 9000)).join(' '),
                    "cvv": Array.from({length: 3}, () => Math.floor(Math.random() * 10)).join(''),
                    "type": ["credit", "debit"][Math.floor(Math.random() * 2)],
                    "expiry": `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
                }),
            });

            if (response.ok) {
                // Handle successful response
                alert('Card added successfully');
            } else {
                // Handle error response
                alert('Failed to add card');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred', error);
        }
          handleClose();
        },
      }}
    >
      <DialogTitle>Create new card</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new card, please enter card name. All other details will
          be auto-generated by the system.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="cardName"
          label="Card Name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardDialog;
