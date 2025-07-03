import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState, useEffect, useRef } from 'react';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';

type Props = {
	setSettings: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setSettings }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const formRef = useRef<HTMLDivElement>(null);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		setFormState(defaultArticleState);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleApply = () => {
		setSettings(formState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	const handleReset = () => {
		setSettings(defaultArticleState);
	};

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='font-size'
						onChange={(option) => handleChange('fontSizeOption', option)}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={(option) => handleChange('fontColor', option)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(option) => handleChange('backgroundColor', option)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(option) => handleChange('contentWidth', option)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
