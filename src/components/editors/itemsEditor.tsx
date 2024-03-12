import { StandardEditorProps } from '@grafana/data'
import { Button, Form, FormAPI, InlineFieldRow, InlineField, Input, Checkbox, ConfirmButton, RadioButtonGroup } from '@grafana/ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { DarkIconMode, DarkIconModeSetting, Item } from 'utils/types'


const ItemDefault: Item = {
    icon: "",
    name: "",
    url: "",
    active: false,
    darkMode: DarkIconMode.auto,
    darkIcon: ""
}

interface Props extends StandardEditorProps<Item[]> { }

export const ItemsEditor: React.FC<Props> = ({ value: elements, onChange }) => {
    if (elements === undefined) { elements = [] }

    //const [selectedDarkIconMode, setSelectedDarkIconMode] = useState<Array<SelectableValue<DarkIconMode>>>(elements.map((item: Item) => { return { value: item.darkMode, label: item.darkMode }}))
    const [selectedDarkMode, setSelectedDarkMode] = useState<DarkIconMode[]>([])


    const handleOnConfirmDeleteTag = (idx: number) => {
        const updatedTags = [...elements]
        updatedTags.splice(idx, 1)
        onChange(updatedTags)
    }

    const handleOnChangeTag = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
        const updatedTags: any[] = [...elements]
        updatedTags[idx][event.currentTarget.name] = event.target.value
        onChange(updatedTags)
    }

    const handleOnChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
        const updatedTags: any[] = [...elements]
        updatedTags[idx][event.currentTarget.name] = event.target.checked
        onChange(updatedTags)
    }

    const handleOnClickAddTag = () => {
        selectedDarkMode.push(DarkIconMode.auto)
        setSelectedDarkMode(selectedDarkMode)
        const updated = [...elements, Object.assign({}, ItemDefault)]
        onChange(updated)
        console.log("OnClickAddTag")
    }

    const handleOnChangeDarkIconMode = (dim: DarkIconMode, idx: number) => {
        let newArray = [...selectedDarkMode]
        newArray[idx] = dim
        setSelectedDarkMode(newArray)
        const updatedTags: any[] = [...elements]
        updatedTags[idx].darkMode = dim
        onChange(updatedTags)
    }

    useEffect(() => {
        console.log("AAA")
        console.log(elements)
        setSelectedDarkMode(elements.map((item: Item) => { return item.darkMode }))
    }, [elements])

    const tagsForm = <div>
        <Form id="tagsForm" onSubmit={handleOnClickAddTag} maxWidth="none">{({ register, errors, control }: FormAPI<any>) => {
            return (<div>
                {elements.map((tag: Item, idx: number) => {
                    //const a: SelectableValue<DarkIconMode> = selectedDarkIconMode[idx].value
                    return <div key={idx}>
                        <InlineFieldRow>
                            <b style={{ width: '20px', height: '32px', display: 'flex', alignItems: 'center' }}>{idx + 1}</b>
                            <InlineField label="URL" labelWidth={10} required grow>
                                <Input name='url' value={tag.url} required onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} />
                            </InlineField>
                        </InlineFieldRow>
                        <div style={{ marginLeft:'20px'}}>
                            <InlineField label="Active" labelWidth={10} style={{display: 'flex', alignItems: 'center'}}>
                                <Checkbox name='active' value={tag.active} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeCheckbox(e, idx)} />
                            </InlineField>
                            <InlineField label="Text" labelWidth={10} grow>
                                <Input name='name' value={tag.name} width={17} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} />
                            </InlineField> 
                            <InlineField label="Icon" labelWidth={10} grow>
                                <Input name='icon' value={tag.icon} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} />
                            </InlineField>
                            <InlineField label="Dark mode" labelWidth={10} style={{display: 'flex', alignItems: 'center'}}>
                                <RadioButtonGroup options={DarkIconModeSetting} value={selectedDarkMode[idx]} onChange={(v) => handleOnChangeDarkIconMode(v, idx)} />
                            </InlineField>
                            <InlineField label="Dark icon" labelWidth={10} grow disabled={selectedDarkMode[idx] !== DarkIconMode.custom} style={{ display: (selectedDarkMode[idx] !== DarkIconMode.custom) ? 'none' : 'flex'}}>
                                <Input name='darkIcon' value={tag.darkIcon} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} disabled={selectedDarkMode[idx] !== DarkIconMode.custom}/>
                            </InlineField>
                            <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '15px'}}>
                                <ConfirmButton
                                    confirmText='Delete'
                                    confirmVariant='destructive'
                                    onConfirm={() => {
                                        handleOnConfirmDeleteTag(idx)
                                    }}>
                                    <Button size='md' variant="destructive" icon="trash-alt">Delete item</Button>
                                </ConfirmButton>
                            </div>
                        </div>
                    </div>
                })}
            </div>)
        }}
        </Form>
        <Button type="submit" form="tagsForm" variant='secondary'>Add tag</Button>
    </div>

    return (tagsForm)
}
