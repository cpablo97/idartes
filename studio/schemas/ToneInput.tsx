import { useCallback, type ChangeEvent } from "react";
import { Button, Flex, Stack, Text, TextInput } from "@sanity/ui";
import { set, unset, type StringInputProps } from "sanity";
import { TONES } from "./tones";

const swatch = (hex: string) => (
  <span
    aria-hidden="true"
    style={{ display: "inline-block", width: "1em", height: "1em", borderRadius: "50%", background: hex, border: "1px solid rgba(0,0,0,.25)", verticalAlign: "-0.15em", marginRight: "0.5em" }}
  />
);

/**
 * Color de marca o color libre. El valor guardado es un string: el nombre del token ("morado")
 * o un hex ("#ffe867"), que es justo lo que espera `color()` en site/src/lib/text.ts.
 */
export function ToneInput(props: StringInputProps) {
  const { value, onChange, readOnly, elementProps } = props;
  const isHex = typeof value === "string" && value.startsWith("#");
  const pick = useCallback((v: string) => onChange(v === value ? unset() : set(v)), [onChange, value]);
  const type = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.currentTarget.value.trim();
      onChange(v ? set(v.startsWith("#") ? v : `#${v}`) : unset());
    },
    [onChange],
  );

  return (
    <Stack gap={3}>
      <Flex gap={2} wrap="wrap">
        {TONES.map((t) => (
          <Button
            key={t.value}
            type="button"
            mode={value === t.value ? "default" : "ghost"}
            tone={value === t.value ? "primary" : "default"}
            selected={value === t.value}
            aria-pressed={value === t.value}
            disabled={readOnly}
            padding={2}
            fontSize={1}
            onClick={() => pick(t.value)}
            text={<>{swatch(t.hex)}{t.title}</>}
          />
        ))}
      </Flex>
      <Flex gap={2} align="center">
        <Text size={1} muted>O un color libre:</Text>
        <div style={{ width: "9em" }}>
          <TextInput
            {...elementProps}
            value={isHex ? value : ""}
            onChange={type}
            readOnly={readOnly}
            placeholder="#rrggbb"
            fontSize={1}
            padding={2}
          />
        </div>
        {isHex && swatch(value!)}
        {value && <Button type="button" mode="bleed" fontSize={1} padding={2} text="Quitar" disabled={readOnly} onClick={() => onChange(unset())} />}
      </Flex>
    </Stack>
  );
}
