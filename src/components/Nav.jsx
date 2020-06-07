import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

// App Navigation Component
export default function Navigation() {
  const { userStatus } = useContext(UserContext);
  const { userData, error } = userStatus;

  return (
    <div className="navigation">
      <Row>
        <Col xs={{ offset: 0 }} className="title">
          <NavLink to="/">
            <div>
              <img
                style={{ height: "40px", position: "fixed", top: 0 }}
                src="data:image/svg+xml;utf  8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSItMTYgMSA1MTEgNTExLjk5OSIgd2lkdGg9IjUxMnB4Ij48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0yNDAuNDk2MDk0IDc5LjY4NzVjOC41OTM3NSAwIDE2LjkwNjI1IDEuMTk1MzEyIDI0Ljc4NTE1NiAzLjQzMzU5NHYtNDIuMTI4OTA2aC00OS41NjY0MDZ2NDIuMTI4OTA2YzcuODc1LTIuMjM4MjgyIDE2LjE4NzUtMy40MzM1OTQgMjQuNzgxMjUtMy40MzM1OTR6bTAgMCIgZmlsbD0iIzAwOWQ4NiIvPjxwYXRoIGQ9Im0yNjUuMjgxMjUgODMuMTIxMDk0Yy03Ljg3ODkwNi0yLjIzODI4Mi0xNi4xOTE0MDYtMy40MzM1OTQtMjQuNzg1MTU2LTMuNDMzNTk0cy0xNi45MDYyNSAxLjE5OTIxOS0yNC43ODEyNSAzLjQzMzU5NGMtMzcuOTMzNTk0IDEwLjc3NzM0NC02NS43MTQ4NDQgNDUuNjc1NzgxLTY1LjcxNDg0NCA4Ny4wNjI1aDE4MC45OTIxODhjLjAwMzkwNi00MS4zODY3MTktMjcuNzgxMjUtNzYuMjg1MTU2LTY1LjcxMDkzOC04Ny4wNjI1em0wIDAiIGZpbGw9IiMwMDlkODYiLz48cGF0aCBkPSJtMzMwLjk5NjA5NCAxNzAuMTgzNTk0aC0xOTguNTg1OTM4djcxLjE2Nzk2OGwxMDguMDg1OTM4LTU1LjAwMzkwNiAxMDguMDg1OTM3IDU1LjAwMzkwNnYtNzEuMTY3OTY4em0wIDAiIGZpbGw9IiNmZmQ3NzciLz48cGF0aCBkPSJtMzQ4LjU4MjAzMSAyNDEuMzUxNTYyLTEwOC4wODU5MzctNTUuMDAzOTA2LTEwOC4wODU5MzggNTUuMDAzOTA2aDg0LjQyMTg3NWMwLTEzLjA3MDMxMiAxMC41OTM3NS0yMy42NjQwNjIgMjMuNjY0MDYzLTIzLjY2NDA2MiAxMy4wNzAzMTIgMCAyMy42NjQwNjIgMTAuNTkzNzUgMjMuNjY0MDYyIDIzLjY2NDA2MnptMCAwIiBmaWxsPSIjZmZiYTRhIi8+PHBhdGggZD0ibTI2NC4xNjAxNTYgMjQxLjM0NzY1NmMwIDEzLjA3MDMxMy0xMC41OTM3NSAyMy42NjQwNjMtMjMuNjY0MDYyIDIzLjY2NDA2My0xMy4wNzAzMTMgMC0yMy42NjQwNjMtMTAuNTkzNzUtMjMuNjY0MDYzLTIzLjY2NDA2MyAwLTEzLjA2NjQwNiAxMC41OTM3NS0yMy42NjQwNjIgMjMuNjY0MDYzLTIzLjY2NDA2MiAxMy4wNzAzMTIgMCAyMy42NjQwNjIgMTAuNTk3NjU2IDIzLjY2NDA2MiAyMy42NjQwNjJ6bTAgMCIgZmlsbD0iI2U2ZTZlNiIvPjxwYXRoIGQ9Im0yNjQuMTYwMTU2IDI0MS4zNTE1NjJjMCAxMy4wNjY0MDctMTAuNTkzNzUgMjMuNjY0MDYzLTIzLjY2NDA2MiAyMy42NjQwNjMtMTMuMDcwMzEzIDAtMjMuNjY0MDYzLTEwLjU5NzY1Ni0yMy42NjQwNjMtMjMuNjY0MDYzaC04NC40MjE4NzV2NTUuNjQwNjI2aDIxNi4xNzE4NzV2LTU1LjY0MDYyNnptMCAwIiBmaWxsPSIjMWNkM2ZiIi8+PHBhdGggZD0ibTM0OC41ODIwMzEgMjk2Ljk5MjE4OGgtMjE2LjE3MTg3NXYxNjUuMDA3ODEyaDUzLjI0NjA5NHYtNjkuNTgyMDMxYzAtMzAuMTY0MDYzIDI0LjY3OTY4OC01NC44NDM3NSA1NC44Mzk4NDQtNTQuODQzNzUgMzAuMTY0MDYyIDAgNTQuODQzNzUgMjQuNjc5Njg3IDU0Ljg0Mzc1IDU0Ljg0Mzc1djY5LjU4MjAzMWg1My4yNDIxODd6bTAgMCIgZmlsbD0iI2ZmYmE0YSIvPjxwYXRoIGQ9Im0yOTUuMzM5ODQ0IDM5Mi40MTc5NjljMC0zMC4xNjQwNjMtMjQuNjc5Njg4LTU0Ljg0Mzc1LTU0Ljg0Mzc1LTU0Ljg0Mzc1LTMwLjE2MDE1NiAwLTU0LjgzOTg0NCAyNC42Nzk2ODctNTQuODM5ODQ0IDU0Ljg0Mzc1em0wIDAiIGZpbGw9IiMxY2QzZmIiLz48cGF0aCBkPSJtMTg1LjY1NjI1IDM5Mi40MTc5NjloMTA5LjY4MzU5NHY2OS41ODIwMzFoLTEwOS42ODM1OTR6bTAgMCIgZmlsbD0iIzFjZDNmYiIvPjxwYXRoIGQ9Im0xMzIuNDEwMTU2IDQ2MnYtMTk2Ljk4ODI4MWgtMTAyLjMzMjAzMXYxOTYuOTg4Mjgxem0wIDAiIGZpbGw9IiNmZmJhNGEiLz48cGF0aCBkPSJtMzAuMDc4MTI1IDI2NS4wMTE3MTloMTAyLjMzMjAzMXYtMzkuMDExNzE5aC0xMDIuMzMyMDMxem0wIDAiIGZpbGw9IiNmZmQ3NzciLz48cGF0aCBkPSJtNDIuMTQ4NDM4IDIyNmg3OC4xOTE0MDZjNi42MDU0NjgtMTMuMjIyNjU2IDMuNTkzNzUtMjkuMTEzMjgxLTkuMDQyOTY5LTM5Ljg5ODQzOGwtMzAuMDUwNzgxLTI1LjY1MjM0My0zMC4wNTQ2ODggMjUuNjUyMzQzYy0xMi42MzY3MTggMTAuNzg1MTU3LTE1LjY0ODQzNyAyNi42NzU3ODItOS4wNDI5NjggMzkuODk4NDM4em0wIDAiIGZpbGw9IiMwMDlkODYiLz48cGF0aCBkPSJtMzY5LjY5NTMxMiAxODYuMTAxNTYyYy0xMi42MzY3MTggMTAuNzg5MDYzLTE1LjY0ODQzNyAyNi42NzU3ODItOS4wMzkwNjIgMzkuODk4NDM4aDc4LjE4NzVjNi42MDU0NjktMTMuMjIyNjU2IDMuNTkzNzUtMjkuMTEzMjgxLTkuMDQyOTY5LTM5Ljg5ODQzOGwtMzAuMDUwNzgxLTI1LjY1MjM0M3ptMCAwIiBmaWxsPSIjMDA5ZDg2Ii8+PHBhdGggZD0ibTQzOC44NDM3NSAyMjZoLTkwLjI2MTcxOXYzOS4wMTE3MTloMTAyLjMzMjAzMXYtMzkuMDExNzE5em0wIDAiIGZpbGw9IiNmZmQ3NzciLz48cGF0aCBkPSJtNDUwLjkxNDA2MiAyNjUuMDExNzE5aC0xMDIuMzMyMDMxdjE5Ni45ODgyODFoMTAyLjMzMjAzMXptMCAwIiBmaWxsPSIjZmZiYTRhIi8+PHBhdGggZD0ibTM5OS43NSA0NjJoLTM4OS4yNTM5MDZ2NDBoNDYwdi00MHptMCAwIiBmaWxsPSIjMDA5ZDg2Ii8+PC9nPjxwYXRoIGQ9Im00NzAuNDk2MDk0IDQ1MmgtOS41ODIwMzJ2LTE3Ni45ODgyODFoOS41ODIwMzJjNS41MjM0MzcgMCAxMC00LjQ3NjU2MyAxMC0xMCAwLTUuNTE5NTMxLTQuNDc2NTYzLTEwLTEwLTEwaC05LjU4MjAzMnYtMjkuMDExNzE5YzAtNS4xNTYyNS0zLjkwMjM0My05LjM5ODQzOC04LjkxNDA2Mi05Ljk0MTQwNiAxLjQxNzk2OS0xMy43MzA0NjktNC4xMjUtMjcuNjc5Njg4LTE1LjcwNzAzMS0zNy41NjI1bC0zMC4wNTA3ODEtMjUuNjUyMzQ0Yy0zLjc0MjE4OC0zLjE5MTQwNi05LjI0NjA5NC0zLjE5MTQwNi0xMi45ODQzNzYgMGwtMzAuMDUwNzgxIDI1LjY1MjM0NGMtMS42NzE4NzUgMS40MjE4NzUtMy4yMDcwMzEgMi45Mzc1LTQuNjI1IDQuNTE5NTMxdi0xMi44MzIwMzFjMC01LjUyMzQzOC00LjQ3NjU2Mi0xMC0xMC0xMGgtOC4wODIwMzFjLTMuODU1NDY5LTM4LjgyMDMxMy0yOS44OTA2MjUtNzEuMjE0ODQ0LTY1LjIxODc1LTg0LjI4OTA2M3YtMzQuOTAyMzQzYzAtNS41MjM0MzgtNC40ODA0NjktMTAtMTAtMTBoLTE0Ljc4MTI1di0yMC45OTIxODhjMC01LjUyMzQzOC00LjQ4MDQ2OS0xMC0xMC0xMC01LjUyMzQzOCAwLTEwIDQuNDc2NTYyLTEwIDEwdjIwLjk5MjE4OGgtMTQuNzg1MTU2Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYyLTEwIDEwdjM0LjkwMjM0M2MtMzUuMzI4MTI1IDEzLjA3NDIxOS02MS4zNjMyODIgNDUuNDY4NzUtNjUuMjE4NzUgODQuMjg5MDYzaC04LjA4MjAzMmMtNS41MjM0MzcgMC0xMCA0LjQ3NjU2Mi0xMCAxMHYxMi44MzIwMzFjLTEuNDE3OTY4LTEuNTgyMDMxLTIuOTUzMTI0LTMuMDk3NjU2LTQuNjIxMDkzLTQuNTIzNDM3bC0zMC4wNTQ2ODgtMjUuNjUyMzQ0Yy0zLjczODI4MS0zLjE4NzUtOS4yNDYwOTMtMy4xOTE0MDYtMTIuOTg0Mzc1LjAwMzkwNmwtMzAuMDUwNzgxIDI1LjY1MjM0NGMtMTEuNTgyMDMxIDkuODgyODEyLTE3LjEyNSAyMy44MzIwMzEtMTUuNzA3MDMxIDM3LjU2MjUtNS4wMTE3MTkuNTQyOTY4LTguOTE0MDYzIDQuNzg1MTU2LTguOTE0MDYzIDkuOTQxNDA2djI5LjAxMTcxOWgtOS41ODIwMzFjLTUuNTIzNDM4IDAtMTAgNC40NzY1NjItMTAgMTAgMCA1LjUyMzQzNyA0LjQ3NjU2MiAxMCAxMCAxMGg5LjU4MjAzMXYxNzYuOTg4MjgxaC05LjU4MjAzMWMtNS41MjM0MzggMC0xMCA0LjQ3NjU2Mi0xMCAxMHY0MGMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwaDQ1OS45OTYwOTRjNS41MjM0MzcgMCAxMC00LjQ4MDQ2OSAxMC0xMHYtNDBjMC01LjUyMzQzOC00LjQ3NjU2My0xMC0xMC0xMHptLTI5LjU4MjAzMiAwaC0zMS4xNjQwNjJ2LTExNC40MjE4NzVjMC01LjUyMzQzNy00LjQ4MDQ2OS0xMC0xMC0xMC01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjExNC40MjE4NzVoLTMxLjE2Nzk2OXYtMTQ1LjE2NDA2MmM0LjcxODc1LS44MDA3ODIgOC4zMTY0MDctNC44OTg0MzggOC4zMTY0MDctOS44NDM3NSAwLTQuOTQ5MjE5LTMuNTk3NjU3LTkuMDQ2ODc2LTguMzE2NDA3LTkuODQ3NjU3di0xMi4xMzI4MTJoODIuMzMyMDMxem0tMTM1LjU3NDIxOCAwdi00OS41ODIwMzFoMi4zNzVjNS41MTk1MzEgMCAxMC00LjQ3NjU2MyAxMC0xMCAwLTUuNTE5NTMxLTQuNDgwNDY5LTEwLTEwLTEwaC0zLjE0ODQzOGMtNC44MjAzMTItMzEuMDIzNDM4LTMxLjcxNDg0NC01NC44Mzk4NDQtNjQuMDcwMzEyLTU0LjgzOTg0NC0zMi4zNTE1NjMgMC01OS4yNDYwOTQgMjMuODE2NDA2LTY0LjA2NjQwNiA1NC44Mzk4NDRoLTMuMTQ4NDM4Yy01LjUxOTUzMSAwLTEwIDQuNDgwNDY5LTEwIDEwIDAgNS41MjM0MzcgNC40ODA0NjkgMTAgMTAgMTBoMi4zNzV2NDkuNTgyMDMxaC0zMy4yNDYwOTR2LTE0NS4wMDc4MTJoMTk2LjE3NTc4MnYxNDUuMDA3ODEyem0tMjEuMTM2NzE5LTY5LjU4MjAzMWgtODcuNDEwMTU2YzQuNTU4NTkzLTE5LjkyNTc4MSAyMi40MTc5NjktMzQuODM5ODQ0IDQzLjcwNzAzMS0zNC44Mzk4NDRzMzkuMTQ0NTMxIDE0LjkxNDA2MyA0My43MDMxMjUgMzQuODM5ODQ0em01NC4zNzg5MDYtMjAyLjIzNDM3NXY0NC44NTkzNzVsLTg4LjE0ODQzNy00NC44NTkzNzV6bS0xOTYuMTcxODc1IDcxLjE2Nzk2OGg2NS45NDE0MDZjNC4yNjU2MjYgMTMuNjkxNDA3IDE3LjA2MjUgMjMuNjYwMTU3IDMyLjE0NDUzMiAyMy42NjAxNTcgMTUuMDgyMDMxIDAgMjcuODc4OTA2LTkuOTY4NzUgMzIuMTQ4NDM3LTIzLjY2MDE1N2g2NS45Mzc1djM1LjY0MDYyNmgtMTk2LjE3MTg3NXptOTguMDg1OTM4IDMuNjYwMTU3Yy03LjUzNTE1NiAwLTEzLjY2NDA2My02LjEyODkwNy0xMy42NjQwNjMtMTMuNjY0MDYzIDAtNy41MzEyNSA2LjEyODkwNy0xMy42NjAxNTYgMTMuNjY0MDYzLTEzLjY2MDE1NnMxMy42NjQwNjIgNi4xMjg5MDYgMTMuNjY0MDYyIDEzLjY2MDE1NmMwIDcuNTM1MTU2LTYuMTI4OTA2IDEzLjY2NDA2My0xMy42NjQwNjIgMTMuNjY0MDYzem02Ni4zODY3MTgtMjMuNjYwMTU3aC0zNC4yMzgyODFjLTQuMjY5NTMxLTEzLjY5NTMxMi0xNy4wNjY0MDYtMjMuNjY0MDYyLTMyLjE0ODQzNy0yMy42NjQwNjItMTUuMDgyMDMyIDAtMjcuODc4OTA2IDkuOTY4NzUtMzIuMTQ0NTMyIDIzLjY2NDA2MmgtMzQuMjQyMTg3bDY2LjM4NjcxOS0zMy43ODUxNTZ6bTUxLjY5OTIxOSAyMy42NjAxNTd2LTMuODE2NDA3YzQuNzE4NzUtLjgwMDc4MSA4LjMxNjQwNy00Ljg5ODQzNyA4LjMxNjQwNy05Ljg0Mzc1IDAtMS45NzI2NTYtLjU3ODEyNi0zLjgwNDY4Ny0xLjU2MjUtNS4zNTE1NjJoNzMuNDY0ODQzLjAzNTE1Ny4wMjczNDMgMi4wNTA3ODF2MTkuMDExNzE5em0xNy42MDU0NjktNjEuMzA0Njg4IDIzLjU2MjUtMjAuMTA5Mzc1IDIzLjU1ODU5NCAyMC4xMDkzNzVjNy4wNjY0MDYgNi4wMjczNDQgMTAuMTAxNTYyIDE0LjMzMjAzMSA4LjUgMjIuMjkyOTY5aC02NC4xMTcxODhjLTEuNjAxNTYyLTcuOTYwOTM4IDEuNDMzNTk0LTE2LjI2NTYyNSA4LjQ5NjA5NC0yMi4yOTI5Njl6bS0xNTAuNDcyNjU2LTE0Mi43MTQ4NDNoMjkuNTY2NDA2djE5Ljc4NTE1NmMtNC44MjgxMjUtLjcxNDg0NC05Ljc2MTcxOS0xLjA4OTg0NC0xNC43ODUxNTYtMS4wODk4NDQtNS4wMjM0MzggMC05Ljk1NzAzMi4zNzUtMTQuNzgxMjUgMS4wODk4NDR6bTE0Ljc4MTI1IDM4LjY5NTMxMmM0MSAwIDc0LjkxNDA2MiAzMC44MTY0MDYgNzkuODU1NDY4IDcwLjQ5NjA5NGgtNzkuODU1NDY4Yy01LjUyMzQzOCAwLTEwIDQuNDgwNDY4LTEwIDEwIDAgMy4yNzM0MzcgMS41NzgxMjUgNi4xNjc5NjggNC4wMDc4MTIgNy45OTIxODdsLTkyLjA5Mzc1IDQ2Ljg2NzE4OHYtNDQuODU5Mzc1aDE4LjA4NTkzOGM1LjUyMzQzNyAwIDEwLTQuNDc2NTYzIDEwLTEwIDAtNS40NzI2NTYtNC4zOTg0MzgtOS45MTQwNjMtOS44NTU0NjktOS45OTIxODggNC45NDE0MDYtMzkuNjgzNTk0IDM4Ljg1NTQ2OS03MC41MDM5MDYgNzkuODU1NDY5LTcwLjUwMzkwNnptLTE4Mi44MTI1IDEwNC4wMTk1MzEgMjMuNTYyNS0yMC4xMDkzNzUgMjMuNTU4NTk0IDIwLjEwOTM3NWM3LjA2MjUgNi4wMjczNDQgMTAuMTAxNTYyIDE0LjMzMjAzMSA4LjQ5NjA5MyAyMi4yOTI5NjloLTY0LjExMzI4MWMtMS42MDE1NjItNy45NjA5MzggMS40MzM1OTQtMTYuMjY1NjI1IDguNDk2MDk0LTIyLjI5Mjk2OXptLTE3LjYwNTQ2OSA0Mi4yOTI5NjloNzUuNTgyMDMxYy0uOTg0Mzc1IDEuNTQ2ODc1LTEuNTYyNSAzLjM3ODkwNi0xLjU2MjUgNS4zNTE1NjIgMCA0Ljk0NTMxMyAzLjU5Mzc1IDkuMDQyOTY5IDguMzEyNSA5Ljg0Mzc1djMuODE2NDA3aC04Mi4zMzIwMzF6bTAgMzkuMDExNzE5aDgyLjMzMjAzMXYxMi4xMzI4MTJjLTQuNzE4NzUuODAwNzgxLTguMzEyNSA0Ljg5ODQzOC04LjMxMjUgOS44NDc2NTcgMCA0Ljk0NTMxMiAzLjU5Mzc1IDkuMDQyOTY4IDguMzEyNSA5Ljg0Mzc1djE0NS4xNjQwNjJoLTMxLjE2NDA2MnYtMTE0LjQyMTg3NWMwLTUuNTIzNDM3LTQuNDgwNDY5LTEwLTEwLTEwLTUuNTIzNDM4IDAtMTAgNC40NzY1NjMtMTAgMTB2MTE0LjQyMTg3NWgtMzEuMTY3OTY5em00MjAuNDE3OTY5IDIxNi45ODgyODFoLTQ0MHYtMjBoMTExLjg5NDUzMS4wMTk1MzEuMDE5NTMyIDY4LjA2MjVjNS41MjM0MzcgMCAxMC00LjQ4MDQ2OSAxMC0xMCAwLTUuNTIzNDM4LTQuNDc2NTYzLTEwLTEwLTEwaC00LjgzOTg0NHYtNDkuNTgyMDMxaDg5LjY4NzV2NDkuNTgyMDMxaC00Ljg0NzY1NmMtNS41MTk1MzIgMC0xMCA0LjQ3NjU2Mi0xMCAxMCAwIDUuNTE5NTMxIDQuNDgwNDY4IDEwIDEwIDEwaDY4LjA3MDMxMi4wMTk1MzEuMDE5NTMxIDExMS44OTQ1MzJ6bTAgMCIvPjxwYXRoIGQ9Im0yMDAuNSAxODAuMTgzNTk0YzUuNTIzNDM4IDAgMTAtNC40NzY1NjMgMTAtMTAgMC01LjUxOTUzMi00LjQ3NjU2Mi0xMC0xMC0xMGgtLjAwNzgxMmMtNS41MTk1MzIgMC05Ljk5NjA5NCA0LjQ4MDQ2OC05Ljk5NjA5NCAxMCAwIDUuNTIzNDM3IDQuNDgwNDY4IDEwIDEwLjAwMzkwNiAxMHptMCAwIi8+PHBhdGggZD0ibTI0MC40OTYwOTQgNDUyaC0uMDA3ODEzYy01LjUxOTUzMSAwLTkuOTk2MDkzIDQuNDc2NTYyLTkuOTk2MDkzIDEwIDAgNS41MTk1MzEgNC40ODA0NjggMTAgMTAuMDAzOTA2IDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTAgMC01LjUyMzQzOC00LjQ3NjU2My0xMC0xMC0xMHptMCAwIi8+PC9zdmc+Cg=="
              />
              <h2 style={{ display: "inline" }}>Cityzen</h2>
            </div>
          </NavLink>
        </Col>

        <nav>
          <Col xs="auto">
            <NavLink exact to="/">
              <p>Home</p>
            </NavLink>
            {/*<NavLink to="journey">*/}
            {/*  <p>Journey</p>*/}
            {/*</NavLink>*/}
            <NavLink exact to="/profile">
              {userData !== null && error == null ? (
                <p>Hello {userData.username}!</p>
              ) : (
                <p>Profile</p>
              )}
            </NavLink>
          </Col>
        </nav>
      </Row>
    </div>
  );
}
