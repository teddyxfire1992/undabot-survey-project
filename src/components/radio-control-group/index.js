import { FormControl, Radio } from '@mui/material';
import PropTypes from 'prop-types';
import { ControlLabel, StyledRadioGroup } from './styled';
import { FormLabel } from '../form-label';
import { ErrorMessage } from '../error-message';

export const RadioControlGroup = ({
	isError,
	isRequired,
	label,
	values,
	onChange,
	errors,
}) => {
	return (
		<FormControl error={isError} required={isRequired} onChange={onChange}>
			<FormLabel>{label}</FormLabel>
			<StyledRadioGroup row>
				{values.map((value) => (
					<ControlLabel
						key={value}
						value={value}
						control={<Radio />}
						label={value}
					/>
				))}
			</StyledRadioGroup>
			{errors &&
				errors.map((error, i) => (
					<ErrorMessage key={error + i}>{error}</ErrorMessage>
				))}
		</FormControl>
	);
};

RadioControlGroup.propTypes = {
	label: PropTypes.string.isRequired,
	errorText: PropTypes.string,
	isError: PropTypes.bool,
	isRequired: PropTypes.bool,
	errors: PropTypes.array,
	values: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
};
