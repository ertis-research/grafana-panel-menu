import { StandardEditorProps } from '@grafana/data'
import { Button, Form, FormAPI, InlineFieldRow, InlineField, Input, DeleteButton, Checkbox } from '@grafana/ui'
import React, { ChangeEvent, useEffect } from 'react'
import { Item } from 'utils/types'


const ItemDefault: Item = {
    icon: "",
    name: "",
    url: "",
    active: false
}

interface Props extends StandardEditorProps<Item[]> { }

export const ItemsEditor: React.FC<Props> = ({ value: elements, onChange }) => {
    if (elements === undefined) { elements = [] }
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

    const handleOnChangeActive = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
        const updatedTags: any[] = [...elements]
        updatedTags[idx].active = event.target.checked
        onChange(updatedTags)
    }

    const handleOnClickAddTag = () => {
        const updated = [...elements, Object.assign({}, ItemDefault)]
        onChange(updated)
        console.log("OnClickAddTag")
    }

    useEffect(() => {
        console.log("AAA")
        console.log(elements)
    }, [elements])

    const tagsForm = <div>
        <Form id="tagsForm" onSubmit={handleOnClickAddTag} maxWidth="none">{({ register, errors, control }: FormAPI<any>) => {
            return (<div>
                {elements.map((tag: Item, idx: number) => {
                    return <InlineFieldRow key={idx}>
                        <b style={{ width: '20px', height: '32px', display: 'flex', alignItems: 'center' }}>{idx + 1}</b>
                        <InlineField label="Active" labelWidth={10}>
                            <Checkbox name='active' value={tag.active} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeActive(e, idx)} />
                        </InlineField>
                        <InlineField label="URL" labelWidth={10} required grow>
                            <Input name='url' value={tag.url} required onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} />
                        </InlineField>
                        <InlineField label="Text" labelWidth={10}>
                            <Input name='name' value={tag.name} width={17} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} />
                        </InlineField>
                        <InlineField label="Icon" labelWidth={10} grow>
                            <Input name='icon' value={tag.icon} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChangeTag(e, idx)} />
                        </InlineField>
                        <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
                            <DeleteButton
                                onConfirm={() => {
                                    handleOnConfirmDeleteTag(idx)
                                }}
                            />
                        </div>
                    </InlineFieldRow>
                })}
            </div>)
        }}
        </Form>
        <Button type="submit" form="tagsForm" variant='secondary' >Add tag</Button>
    </div>

    return (tagsForm)
}
