import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadImage from '.';

const getImage = (): File =>
  new File([], 'text.jpg', {
    type: 'image/jpeg',
  });

describe('UploadImage', () => {
  it('displays an headline', () => {
    render(<UploadImage />);
    expect(screen.getByText('Choose an Image to Upload')).toBeInTheDocument();
  });

  it('displays a form to input an image', () => {
    render(<UploadImage />);
    expect(document.querySelector('form')).toBeInTheDocument();
  });

  it('displays a input for files', () => {
    render(<UploadImage />);
    expect(screen.getByTestId('test-file-upload'));
  });

  it('displays the image when an image is imported', async () => {
    render(<UploadImage />);

    userEvent.upload(screen.getByTestId('test-file-upload'), getImage());
    expect(await screen.findByRole('img')).toHaveAttribute(
      'src',
      'data:image/jpeg;base64,',
    );
  });

  it('displays no image when no image is upload', () => {
    render(<UploadImage />);

    userEvent.upload(screen.getByTestId('test-file-upload'), []);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
