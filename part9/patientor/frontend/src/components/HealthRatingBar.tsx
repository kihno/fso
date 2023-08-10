import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { styled } from '@mui/material/styles';

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  }
});

const HEALTHBAR_TEXTS = [
  "The patient has a diagnosed condition",
  "The patient has a high risk of getting sick",
  "The patient has a low risk of getting sick",
  "The patient is in great shape",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      <StyledRating
        readOnly
        value={0 + rating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating - 1]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
