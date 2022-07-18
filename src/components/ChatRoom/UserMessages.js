import { Avatar, Typography } from "antd";
import React from "react";
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
const WrapperStyled = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items:flex-end;
    .author {
        margin-right: 5px;
        font-weight: bold;
    } 

    .date {
        margin-right: 10px;
        font-size: 11px;
        color: #a7a7a7;
    }
    .content {
        margin-right: 30px;
    }
`

function formatDate(seconds) {
    let formattedDate = '';
  
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
  
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  
    return formattedDate;
  }
  

export  default function UserMessage({text, displayName, createdAt, photoURL}){
    return (
        <WrapperStyled>
          <div>
            <Typography.Text className='date'>
              {formatDate(createdAt?.seconds)}
            </Typography.Text>
            <Typography.Text className='author'>{displayName}</Typography.Text>
            <Avatar size='small' src={photoURL}>
              {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
          </div>
          <div>
            <Typography.Text className='content'>{text}</Typography.Text>
          </div>
        </WrapperStyled>
      );
}