import styled from "styled-components";

export const Container = styled.div`
    padding: 40px;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`;

export const HeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;

export const HeaderTitleText = styled.h1`
    color: #212B36;
    font-weight: bold;
    font-size: 18px;
    margin: 0;
`;

export const HeaderTitleDescription = styled.p`
    color: #637381;
    font-weight: bold;
    font-size: 14px;
    margin: 0;
`;

export const TableHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const TableHeaderTitleContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 24px;
`;

export const TableHeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
`;

export const CellHeadText = styled.span`
    color: #637381;
    font-weight: bold;
`;

export const CellRowText = styled.span`
    color: #212B36;
`;