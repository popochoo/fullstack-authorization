// Полный список всех возможных единиц времени и их сокращений
type Unit =
	| 'ms'
	| 'msec'
	| 'millisecond'
	| 'milliseconds'
	| 's'
	| 'sec'
	| 'second'
	| 'seconds'
	| 'm'
	| 'min'
	| 'minute'
	| 'minutes'
	| 'h'
	| 'hr'
	| 'hour'
	| 'hours'
	| 'd'
	| 'day'
	| 'days'
	| 'w'
	| 'week'
	| 'weeks'
	| 'mo'
	| 'mon'
	| 'month'
	| 'months'
	| 'y'
	| 'yr'
	| 'year'
	| 'years'

// Поддержка любого регистра (дней, ДНЕЙ, Дней)
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit> | Capitalize<Unit>

export type StringValue =
	| `${number}`
	| `${number}${UnitAnyCase}`
	| `${number} ${UnitAnyCase}`

// Коэффициенты перевода в миллисекунды
const s = 1000
const m = s * 60
const h = m * 60
const d = h * 24
const w = d * 7
const mo = d * 30.4375 // Средняя продолжительность месяца с учетом високосных лет
const y = d * 365.25

const unitMap: Record<string, number> = {
	// Миллисекунды
	ms: 1,
	msec: 1,
	millisecond: 1,
	milliseconds: 1,
	// Секунды
	s: s,
	sec: s,
	second: s,
	seconds: s,
	// Минуты
	m: m,
	min: m,
	minute: m,
	minutes: m,
	// Часы
	h: h,
	hr: h,
	hour: h,
	hours: h,
	// Дни
	d: d,
	day: d,
	days: d,
	// Недели
	w: w,
	week: w,
	weeks: w,
	// Месяцы
	mo: mo,
	mon: mo,
	month: mo,
	months: mo,
	// Года
	y: y,
	yr: y,
	year: y,
	years: y
}

export function ms(str: StringValue): number {
	if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
		throw new Error(
			'Value provided to ms() must be a string with length between 1 and 99.'
		)
	}

	// Регулярное выражение поддерживает: целые, дробные (через точку/запятую) и отрицательные числа
	const regex = /^(?<value>-?(?:\d+)?[\.,]?\d+)\s*(?<type>[a-zA-Z]+)?$/
	const match = str.trim().match(regex)

	if (!match || !match.groups) {
		throw new Error(`Invalid string format: "${str}"`)
	}

	// Заменяем запятую на точку для корректного parseFloat
	const normalizedValue = match.groups.value.replace(',', '.')
	const value = parseFloat(normalizedValue)
	const type = match.groups.type ? match.groups.type.toLowerCase() : 'ms'

	if (!(type in unitMap)) {
		throw new Error(`Unknown time unit: "${match.groups.type}"`)
	}

	return Math.round(value * unitMap[type])
}
