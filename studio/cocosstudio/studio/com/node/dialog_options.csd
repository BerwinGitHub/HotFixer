<GameFile>
  <PropertyGroup Name="dialog_options" Type="Node" ID="1e52cc36-3a3f-4f2b-9a42-22e70d70e0d0" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="575" Speed="1.0000" ActivedAnimationName="enter">
        <Timeline ActionTag="-1552354127" Property="Position">
          <PointFrame FrameIndex="0" X="0.0000" Y="-568.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="25" X="0.0000" Y="500.0000">
            <EasingData Type="29" />
          </PointFrame>
          <PointFrame FrameIndex="575" X="0.0000" Y="500.0000">
            <EasingData Type="29" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="-1552354127" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="25" X="1.0000" Y="1.0000">
            <EasingData Type="29" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="575" X="1.0000" Y="1.0000">
            <EasingData Type="29" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-1552354127" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="25" X="0.0000" Y="0.0000">
            <EasingData Type="29" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="575" X="0.0000" Y="0.0000">
            <EasingData Type="29" />
          </ScaleFrame>
        </Timeline>
      </Animation>
      <AnimationList>
        <AnimationInfo Name="enter" StartIndex="0" EndIndex="575">
          <RenderColor A="255" R="128" G="0" B="0" />
        </AnimationInfo>
      </AnimationList>
      <ObjectData Name="Node" Tag="68" ctype="GameNodeObjectData">
        <Size X="0.0000" Y="0.0000" />
        <Children>
          <AbstractNodeData Name="Panel_1" ActionTag="2021320814" Tag="69" IconVisible="False" LeftMargin="-384.0000" RightMargin="-384.0000" TopMargin="-568.0000" BottomMargin="-568.0000" TouchEnable="True" ClipAble="False" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="768.0000" Y="1136.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <SingleColor A="255" R="30" G="48" B="88" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="Panel_2" ActionTag="-1552354127" Tag="70" IconVisible="False" LeftMargin="-384.0000" RightMargin="-384.0000" TopMargin="568.0000" BottomMargin="-1704.0000" TouchEnable="True" ClipAble="False" ComboBoxIndex="1" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="768.0000" Y="1136.0000" />
            <Children>
              <AbstractNodeData Name="shadow_1" ActionTag="54617957" Tag="83" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TopMargin="-8.0000" BottomMargin="1136.0000" ctype="SpriteObjectData">
                <Size X="768.0000" Y="8.0000" />
                <AnchorPoint ScaleX="0.5000" />
                <Position X="384.0000" Y="1136.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="1.0000" />
                <PreSize X="1.0000" Y="0.0070" />
                <FileData Type="MarkedSubImage" Path="studio/com/imgs/ui/shadow.png" Plist="studio/com/imgs/ui.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="btn_close_3" ActionTag="1296217186" Tag="85" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.6800" RightMargin="732.3200" TopMargin="1096.6400" BottomMargin="11.3600" ctype="SpriteObjectData">
                <Size X="28.0000" Y="28.0000" />
                <AnchorPoint />
                <Position X="7.6800" Y="11.3600" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="252" G="156" B="18" />
                <PrePosition X="0.0100" Y="0.0100" />
                <PreSize X="0.0365" Y="0.0246" />
                <FileData Type="MarkedSubImage" Path="studio/com/imgs/ui/btn_close.png" Plist="studio/com/imgs/ui.plist" />
                <BlendFunc Src="1" Dst="771" />
              </AbstractNodeData>
              <AbstractNodeData Name="Button_1" ActionTag="2010553153" Tag="86" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="224.0000" RightMargin="224.0000" TopMargin="869.5634" BottomMargin="181.4366" TouchEnable="True" FontSize="36" ButtonText="Rate Us" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="290" Scale9Height="63" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="320.0000" Y="85.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="384.0000" Y="223.9366" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="252" G="156" B="18" />
                <PrePosition X="0.5000" Y="0.1971" />
                <PreSize X="0.4167" Y="0.0748" />
                <FontResource Type="Normal" Path="studio/com/fonts/JosefinSans-Regular.ttf" Plist="" />
                <TextColor A="255" R="165" G="42" B="42" />
                <DisabledFileData Type="MarkedSubImage" Path="studio/com/imgs/ui/btn_bg.png" Plist="studio/com/imgs/ui.plist" />
                <PressedFileData Type="MarkedSubImage" Path="studio/com/imgs/ui/btn_bg.png" Plist="studio/com/imgs/ui.plist" />
                <NormalFileData Type="MarkedSubImage" Path="studio/com/imgs/ui/btn_bg.png" Plist="studio/com/imgs/ui.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position Y="-568.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.0000" Y="0.0000" />
            <SingleColor A="255" R="30" G="48" B="88" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>