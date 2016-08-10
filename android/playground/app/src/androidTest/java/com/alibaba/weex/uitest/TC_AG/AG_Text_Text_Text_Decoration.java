package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Text_Text_Text_Decoration extends TestFlow {
	public AG_Text_Text_Text_Decoration() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Text");
		testMap.put("testChildCaseInit", "AG_Text_Text_Text_Decoration");
		testMap.put("step1",new HashMap(){
			{
				put("click", "none");
				put("screenshot", "AG_Text_Text_Text_Decoration_01_none");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "underline");
				put("screenshot", "AG_Text_Text_Text_Decoration_02_underline");
			}
		});
		testMap.put("step3",new HashMap(){
			{
				put("click", "line-through");
				put("screenshot", "AG_Text_Text_Text_Decoration_03_line-through");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
